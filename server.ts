import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

// Resolve standard ESModule paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers Middleware
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Support JSON payloads for admin media uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const uploadDir = path.resolve(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  // Lightweight rate limiter to prevent API spamming & Denial of Service (DoS)
  const rateLimitWindow = 15 * 60 * 1000; // 15 mins window
  const maxRequests = 100; // limit each IP to 100 requests per window
  const requestHistory = new Map<string, { count: number; resetTime: number }>();

  const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown-ip";
    const now = Date.now();
    const clientData = requestHistory.get(ip);

    if (!clientData || now > clientData.resetTime) {
      requestHistory.set(ip, { count: 1, resetTime: now + rateLimitWindow });
    } else {
      clientData.count++;
      if (clientData.count > maxRequests) {
        return res.status(429).json({ error: "Too many requests from this IP. Access throttled to prevent DoS." });
      }
    next();
  };

  const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const adminPassword = process.env.VITE_ADMIN_PASSWORD || "";
    if (adminPassword) {
      const authHeader = req.headers["x-admin-token"];
      if (authHeader !== adminPassword) {
        return res.status(401).json({ error: "Unauthorized: Invalid administration credentials" });
      }
    }
    next();
  };

  // API endpoint to handle uploaded admin video loop safely
  app.post("/api/upload-video", rateLimiter, adminAuth, async (req, res) => {
    try {
      const { videoData, filename } = req.body;
      if (!videoData || typeof videoData !== "string") {
        return res.status(400).json({ error: "Invalid or missing videoData" });
      }

      const matches = videoData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "mp4";
      const allowedMimes = ["video/mp4", "video/webm", "video/quicktime", "video/ogg"];

      if (matches && matches.length === 3) {
        const mimeType = matches[1].toLowerCase();
        if (!allowedMimes.includes(mimeType)) {
          return res.status(400).json({ error: "Unsupported media format" });
        }
        buffer = Buffer.from(matches[2], "base64");
        if (mimeType.includes("webm")) ext = "webm";
        else if (mimeType.includes("ogg")) ext = "ogg";
        else if (mimeType.includes("quicktime")) ext = "mov";
      } else {
        buffer = Buffer.from(videoData, "base64");
      }

      // Enforce maximum 50MB size limit
      if (buffer.length > 50 * 1024 * 1024) {
        return res.status(413).json({ error: "File exceeds 50MB size limit" });
      }

      const safeBaseName = filename ? path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_") : "";
      const cleanFilename = safeBaseName ? `${Date.now()}_${safeBaseName}` : `imported-scent-film-${Date.now()}.${ext}`;
      
      const filePath = path.resolve(uploadDir, cleanFilename);
      if (!filePath.startsWith(uploadDir)) {
        return res.status(403).json({ error: "Invalid file path traversal attempt" });
      }

      await fs.writeFile(filePath, buffer);
      console.log(`Successfully stored uploaded video on server disk: ${filePath}`);

      res.json({
        success: true,
        url: `/uploads/${cleanFilename}`,
      });
    } catch (err: any) {
      console.error("Video upload handler exception:", err);
      res.status(500).json({ error: "Failed to process film file upload" });
    }
  });

  // API endpoint to handle uploaded admin custom collection cover photos and products images safely
  app.post("/api/upload-image", rateLimiter, adminAuth, async (req, res) => {
    try {
      const { imageData, filename } = req.body;
      if (!imageData || typeof imageData !== "string") {
        return res.status(400).json({ error: "Invalid or missing imageData" });
      }

      const matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "jpg";
      const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (matches && matches.length === 3) {
        const mimeType = matches[1].toLowerCase();
        if (!allowedMimes.includes(mimeType)) {
          return res.status(400).json({ error: "Unsupported image format" });
        }
        buffer = Buffer.from(matches[2], "base64");
        if (mimeType.includes("png")) ext = "png";
        else if (mimeType.includes("webp")) ext = "webp";
      } else {
        buffer = Buffer.from(imageData, "base64");
      }

      // Enforce maximum 10MB size limit for images
      if (buffer.length > 10 * 1024 * 1024) {
        return res.status(413).json({ error: "Image exceeds 10MB size limit" });
      }

      const safeBaseName = filename ? path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_") : "";
      const cleanFilename = safeBaseName ? `${Date.now()}_${safeBaseName}` : `collection-cover-${Date.now()}.${ext}`;

      const filePath = path.resolve(uploadDir, cleanFilename);
      if (!filePath.startsWith(uploadDir)) {
        return res.status(403).json({ error: "Invalid file path traversal attempt" });
      }

      await fs.writeFile(filePath, buffer);
      console.log(`Successfully stored uploaded image on server disk: ${filePath}`);

      res.json({
        success: true,
        url: `/uploads/${cleanFilename}`,
      });
    } catch (err: any) {
      console.error("Image upload handler exception:", err);
      res.status(500).json({ error: "Failed to process image file upload" });
    }
  });

  // Explicitly serve uploaded film files publicly
  app.use("/uploads", express.static(uploadDir));

  // Connect Vite development server or production assets
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting full-stack integration in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting full-stack integration in PRODUCTION mode...");
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Imperial Server executing on port ${PORT}`);
  });
}

startServer();
