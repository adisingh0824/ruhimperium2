import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import twilio from "twilio";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Resolve standard ESModule paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Simple CORS middleware for dev/testing
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-token");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Security Headers Middleware (Defends against XSS, clickjacking, data leak, and MIME attacks)
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
  });

  // Support JSON payloads for admin media uploads and order notifications
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const uploadDir = path.resolve(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  // Lightweight rate limiter to prevent API spamming & Denial of Service (DoS)
  const rateLimitWindow = 15 * 60 * 1000; // 15 mins window
  const maxRequests = 100; // limit each IP to 100 requests per window
  const requestHistory = new Map<string, { count: number; resetTime: number }>();

  // Prune expired rate limit entries to prevent memory leak
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requestHistory.entries()) {
      if (now > data.resetTime) {
        requestHistory.delete(ip);
      }
    }
  }, 5 * 60 * 1000).unref();

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
    }
    next();
  };

  // Strict Admin Authorization: Default Deny (unauthenticated requests rejected)
  const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const expectedPassword = process.env.VITE_ADMIN_PASSWORD || "Adi19983@@";
    const authHeader = req.headers["x-admin-token"];
    if (!authHeader || typeof authHeader !== "string" || authHeader !== expectedPassword) {
      return res.status(401).json({ error: "Unauthorized: Invalid administration credentials" });
    }
    next();
  };

  // Helper: Format invoice message for WhatsApp
  function formatWhatsAppInvoice(order: any): string {
    const lines: string[] = [];
    lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`*Order ID:* ${order.id || "N/A"}`);
    lines.push(`*Date:* ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}`);
    lines.push(`*Payment Mode:* ${order.paymentMode || "Cash on Delivery"}`);
    lines.push(`*Status:* ${order.status || "Processing"}`);
    if (order.trackingCode) {
      lines.push(`*Tracking Code:* ${order.trackingCode}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`👤 *CUSTOMER DETAILS*`);
    lines.push(`*Name:* ${order.fullName || order.customerName || "N/A"}`);
    lines.push(`*Phone:* ${order.phone || "N/A"}`);
    if (order.email) lines.push(`*Email:* ${order.email}`);
    if (order.address) {
      lines.push(`*Address:* ${order.address}${order.pincode ? `, PIN: ${order.pincode}` : ""}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`🛍️ *ORDER ITEMS*`);

    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item: any, idx: number) => {
        const name = item.product?.name || item.name || item.title || `Item ${idx + 1}`;
        const size = item.selectedSize ? ` [${item.selectedSize}]` : "";
        const qty = item.quantity || item.qty || 1;
        const price = item.product?.salePrice || item.price || item.amount || "";
        lines.push(`${idx + 1}. ${name}${size} × ${qty} ${price ? `(₹${price})` : ""}`);
      });
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`💰 *TOTAL AMOUNT:* ₹${order.total || 0}`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`✨ _Automated Ruh Imperium Order Dispatch Notification_`);
    return lines.join("\n");
  }

  // Unified Order Notification Handler (WhatsApp + Email)
  async function handleOrderNotification(req: express.Request, res: express.Response) {
    try {
      const { order } = req.body as { order: any };
      if (!order || !order.id) {
        return res.status(400).json({ error: "Missing or invalid order data" });
      }

      console.log(`[Order Notification] Processing order #${order.id} (Payment: ${order.paymentMode}, Total: ₹${order.total})`);

      // 1. WhatsApp Delivery
      const whatsappPromise = (async () => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        // The active Twilio Sandbox sender or configured number
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+17372508034";
        const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || "whatsapp:+919785854770";
        const messageBody = formatWhatsAppInvoice(order);

        if (accountSid && authToken) {
          try {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({
              body: messageBody,
              from: fromNumber.startsWith("whatsapp:") ? fromNumber : `whatsapp:${fromNumber}`,
              to: toNumber.startsWith("whatsapp:") ? toNumber : `whatsapp:${toNumber}`,
            });
            console.log(`[Twilio WhatsApp] Order invoice sent successfully! SID: ${result.sid}`);
            return { success: true, sid: result.sid, provider: "twilio" };
          } catch (twilioErr: any) {
            console.warn(`[Twilio WhatsApp] Notice (${twilioErr.code}): ${twilioErr.message}`);
            if (twilioErr.code === 21654 || twilioErr.code === 63016) {
              console.warn(
                `[Twilio WhatsApp] Sandbox session expired or closed. To receive free-form invoices on WhatsApp, message "join twilio-trial" from ${toNumber} to ${fromNumber}.`
              );
            }

            // Optional CallMeBot fallback if user configured CALLMEBOT_API_KEY
            if (process.env.CALLMEBOT_API_KEY) {
              try {
                const plainPhone = toNumber.replace(/[^0-9]/g, "");
                const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${plainPhone}&text=${encodeURIComponent(messageBody)}&apikey=${process.env.CALLMEBOT_API_KEY}`;
                await fetch(callMeBotUrl);
                console.log(`[CallMeBot WhatsApp] Dispatched invoice fallback`);
                return { success: true, provider: "callmebot" };
              } catch (cbErr: any) {
                console.warn(`[CallMeBot WhatsApp] Fallback error:`, cbErr.message);
              }
            }

            return { success: false, error: twilioErr.message, code: twilioErr.code };
          }
        } else {
          console.warn(`[Twilio WhatsApp] Credentials not configured in .env. Invoice preview:`);
          console.log(messageBody);
          return { success: false, message: "Twilio credentials not configured in .env" };
        }
      })();

      // 2. Email Delivery (Nodemailer SMTP / Gmail or EmailJS)
      const emailPromise = (async () => {
        const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
        const adminEmails = process.env.ADMIN_EMAIL || "ruhimperiun9@gmail.com, saditya7990@gmail.com";

        if (gmailUser && gmailPass) {
          try {
            const transporter = nodemailer.createTransport({
              service: process.env.SMTP_SERVICE || "gmail",
              host: process.env.SMTP_HOST || undefined,
              port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
              auth: {
                user: gmailUser,
                pass: gmailPass,
              },
            });

            const itemsHtml = (order.items || []).map((item: any) => {
              const name = item.product?.name || item.name || "Fragrance";
              const size = item.selectedSize ? ` (${item.selectedSize})` : "";
              const qty = item.quantity || 1;
              const price = item.product?.salePrice || item.price || 0;
              return `<li style="margin-bottom: 8px;"><strong>${qty}x</strong> ${name}${size} — ₹${price * qty}</li>`;
            }).join("");

            const recipients = [adminEmails];
            if (order.email && order.email.includes("@")) {
              recipients.push(order.email);
            }

            const mailOptions = {
              from: `"Ruh Imperium Orders" <${gmailUser}>`,
              to: recipients.join(", "),
              subject: `[RUH IMPERIUM] Order Confirmed: #${order.id} (${order.paymentMode || "COD"})`,
              html: `
                <div style="font-family: 'Georgia', serif; color: #1a1715; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #D4BC96; border-radius: 12px; background-color: #FAF9F5;">
                  <h1 style="text-align: center; text-transform: uppercase; letter-spacing: 3px; color: #1a1715; margin-bottom: 4px;">RUH IMPERIUM</h1>
                  <p style="text-align: center; color: #9A7B4F; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Imperial Perfumery &amp; Attar Registry</p>
                  <hr style="border: 0; border-top: 1px solid #E6D8C3; margin: 20px 0;" />
                  
                  <h3 style="color: #1a1715; margin-bottom: 8px;">Order Details: #${order.id}</h3>
                  <p style="margin: 4px 0;"><strong>Customer:</strong> ${order.fullName || "Valued Client"}</p>
                  <p style="margin: 4px 0;"><strong>Email:</strong> ${order.email || "N/A"}</p>
                  <p style="margin: 4px 0;"><strong>Phone:</strong> ${order.phone || "N/A"}</p>
                  <p style="margin: 4px 0;"><strong>Payment Method:</strong> ${order.paymentMode || "Cash on Delivery"}</p>
                  ${order.trackingCode ? `<p style="margin: 4px 0;"><strong>Tracking Code:</strong> <span style="font-family: monospace;">${order.trackingCode}</span></p>` : ""}
                  
                  <h4 style="color: #1a1715; margin-top: 16px; margin-bottom: 8px;">Delivery Address</h4>
                  <p style="margin: 4px 0; background: #fff; padding: 12px; border-radius: 6px; border: 1px solid #eee;">
                    ${order.address || "N/A"}<br><strong>Pincode:</strong> ${order.pincode || "N/A"}
                  </p>
                  
                  <hr style="border: 0; border-top: 1px solid #E6D8C3; margin: 20px 0;" />
                  
                  <h4 style="color: #1a1715; margin-bottom: 8px;">Artisanal Parcels</h4>
                  <ul style="padding-left: 20px;">
                    ${itemsHtml || "<li>Standard Order Items</li>"}
                  </ul>
                  
                  <div style="text-align: right; margin-top: 24px; padding: 16px; background-color: #1a1715; color: #FAF9F5; border-radius: 8px;">
                    <div style="font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #D4BC96;">Total Order Value</div>
                    <div style="font-size: 24px; font-weight: bold;">₹${order.total || 0}</div>
                  </div>
                  
                  <p style="text-align: center; font-size: 11px; color: #888; margin-top: 24px;">
                    Automated notification from Ruh Imperium Logistics &bull; Dispatched from Kannauj, India
                  </p>
                </div>
              `,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`[Nodemailer] Order invoice email sent! MessageId: ${info.messageId}`);
            return { success: true, messageId: info.messageId, provider: "nodemailer" };
          } catch (mailErr: any) {
            console.error(`[Nodemailer] Email delivery error:`, mailErr?.message || mailErr);
            return { success: false, error: mailErr?.message };
          }
        }

        // EmailJS REST API fallback if configured
        const emailjsServiceId = process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
        const emailjsTemplateId = process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
        const emailjsPublicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;
        const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

        if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
          try {
            const payload: any = {
              service_id: emailjsServiceId,
              template_id: emailjsTemplateId,
              user_id: emailjsPublicKey,
              template_params: {
                order_id: order.id || "",
                customer_name: order.fullName || "",
                customer_email: order.email || "",
                customer_phone: order.phone || "",
                order_total: `₹${order.total || 0}`,
                payment_mode: order.paymentMode || "",
                tracking_code: order.trackingCode || "",
                shipping_address: `${order.address || ""}, PIN: ${order.pincode || ""}`,
                admin_email_1: "ruhimperiun9@gmail.com",
                admin_email_2: "saditya7990@gmail.com",
              },
            };
            if (emailjsPrivateKey) {
              payload.accessToken = emailjsPrivateKey;
            }

            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
              console.log("[EmailJS REST] Notification email sent successfully");
              return { success: true, provider: "emailjs-rest" };
            } else {
              const text = await response.text();
              console.warn("[EmailJS REST] Failed to send email:", text);
              return { success: false, error: text };
            }
          } catch (ejsErr: any) {
            console.warn("[EmailJS REST] Request error:", ejsErr?.message || ejsErr);
            return { success: false, error: ejsErr?.message };
          }
        }

        console.log("[Email Notification] Configure GMAIL_USER & GMAIL_APP_PASSWORD in .env for direct automated email receipts.");
        return { success: false, message: "Email credentials not configured in .env" };
      })();

      const [whResult, emailResult] = await Promise.all([whatsappPromise, emailPromise]);
      return res.json({ success: true, whatsapp: whResult, email: emailResult });
    } catch (err: any) {
      console.error("[Order Notification] General error:", err);
      return res.status(500).json({ error: "Failed to process order notification", details: err?.message });
    }
  }

  // Endpoints for order notifications (supporting legacy paths for full backwards compatibility)
  app.post("/api/notify-paid", handleOrderNotification);
  app.post("/api/notify-order", handleOrderNotification);
  app.post("/api/send-whatsapp", handleOrderNotification);
  app.post("/api/send-email", handleOrderNotification);

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
      const cleanFilename = safeBaseName ? `${Date.now()}_${safeBaseName}` : `distillery-loop-${Date.now()}.${ext}`;

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

  // API endpoint to handle uploaded admin custom images safely
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

  // Explicitly serve uploaded media files with strict non-executable headers
  app.use(
    "/uploads",
    express.static(uploadDir, {
      setHeaders: (res) => {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Content-Disposition", "inline");
        res.setHeader("Cache-Control", "public, max-age=86400");
      },
    })
  );

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
