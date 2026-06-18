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

  // Support large base64 media uploads (up to 100MB) from the Admin Hub
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  // API endpoint to handle uploaded admin video loop
  app.post("/api/upload-video", async (req, res) => {
    try {
      const { videoData, filename } = req.body;
      if (!videoData) {
        return res.status(400).json({ error: "Missing videoData" });
      }

      // Check if it's a data url / base64 string
      const matches = videoData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "mp4";

      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], "base64");
        const mimeType = matches[1];
        if (mimeType.includes("webm")) ext = "webm";
        else if (mimeType.includes("ogg")) ext = "ogg";
        else if (mimeType.includes("quicktime")) ext = "mov";
      } else {
        buffer = Buffer.from(videoData, "base64");
      }

      // We determine final safe filename
      const cleanFilename = filename 
        ? filename.replace(/[^a-zA-Z0-9.\-_]/g, "_") 
        : `imported-scent-film-${Date.now()}.${ext}`;
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, cleanFilename);
      await fs.writeFile(filePath, buffer);

      console.log(`Successfully stored uploaded video on server disk: ${filePath}`);

      // Return local server absolute routing URL
      res.json({
        success: true,
        url: `/uploads/${cleanFilename}`,
      });
    } catch (err: any) {
      console.error("Video upload handler exception:", err);
      res.status(500).json({ error: err.message || "Failed to process film file upload" });
    }
  });

  // API endpoint to handle uploaded admin custom collection cover photos and products images
  app.post("/api/upload-image", async (req, res) => {
    try {
      const { imageData, filename } = req.body;
      if (!imageData) {
        return res.status(400).json({ error: "Missing imageData" });
      }

      const matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "jpg";

      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], "base64");
        const mimeType = matches[1];
        if (mimeType.includes("png")) ext = "png";
        else if (mimeType.includes("webp")) ext = "webp";
        else if (mimeType.includes("gif")) ext = "gif";
        else if (mimeType.includes("svg")) ext = "svg";
      } else {
        buffer = Buffer.from(imageData, "base64");
      }

      const cleanFilename = filename 
        ? filename.replace(/[^a-zA-Z0-9.\-_]/g, "_") 
        : `collection-cover-${Date.now()}.${ext}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, cleanFilename);
      await fs.writeFile(filePath, buffer);

      console.log(`Successfully stored uploaded image on server disk: ${filePath}`);

      res.json({
        success: true,
        url: `/uploads/${cleanFilename}`,
      });
    } catch (err: any) {
      console.error("Image upload handler exception:", err);
      res.status(500).json({ error: err.message || "Failed to process image file upload" });
    }
  });

  // Explicitly serve uploaded film files publicly
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Imperial Server executing on port ${PORT}`);
  });
}

startServer();
