import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';


dotenv.config();

// Resolve standard ESModule paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  // Simple CORS middleware for dev/testing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
  const PORT = 3000;

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

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });

  // Support JSON payloads for admin media uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const uploadDir = path.resolve(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });

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

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    } else {
      clientData.count++;
      if (clientData.count > maxRequests) {
        return res.status(429).json({ error: "Too many requests from this IP. Access throttled to prevent DoS." });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
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

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    }
    next();
  };

  // API endpoint to handle uploaded admin video loop safely
  app.post("/api/upload-video", rateLimiter, adminAuth, async (req, res) => {
    try {
      const { videoData, filename } = req.body;
      if (!videoData || typeof videoData !== "string") {
        return res.status(400).json({ error: "Invalid or missing videoData" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      const matches = videoData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "mp4";
      const allowedMimes = ["video/mp4", "video/webm", "video/quicktime", "video/ogg"];

      if (matches && matches.length === 3) {
        const mimeType = matches[1].toLowerCase();
        if (!allowedMimes.includes(mimeType)) {
          return res.status(400).json({ error: "Unsupported media format" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
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

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      const safeBaseName = filename ? path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_") : "";
      const cleanFilename = safeBaseName ? `${Date.now()}_${safeBaseName}` : `imported-scent-film-${Date.now()}.${ext}`;
      
      const filePath = path.resolve(uploadDir, cleanFilename);
      if (!filePath.startsWith(uploadDir)) {
        return res.status(403).json({ error: "Invalid file path traversal attempt" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      await fs.writeFile(filePath, buffer);
      console.log(`Successfully stored uploaded video on server disk: ${filePath}`);

      res.json({
        success: true,
        url: `/uploads/${cleanFilename}`,
      });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    } catch (err: any) {
      console.error("Video upload handler exception:", err);
      res.status(500).json({ error: "Failed to process film file upload" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    }
  });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });

  // API endpoint to forward order details to WhatsApp automatically in the background
  app.post('/api/send-whatsapp', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
      const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';

      const lines: string[] = [];
      lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`*Order ID:* ${order.id || 'N/A'}`);
      lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
      lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
      if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`👤 *CUSTOMER DETAILS*`);
      lines.push(`*Name:* ${order.fullName || order.customerName || 'N/A'}`);
      lines.push(`*Phone:* ${order.phone || 'N/A'}`);
      if (order.email) lines.push(`*Email:* ${order.email}`);
      if (order.address) lines.push(`*Address:* ${order.address}${order.pincode ? `, PIN: ${order.pincode}` : ''}`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`🛍️ *ORDER ITEMS*`);

      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item: any, idx: number) => {
          const name = item.product?.name || item.name || item.title || `Item ${idx + 1}`;
          const size = item.selectedSize ? ` [${item.selectedSize}]` : '';
          const qty = item.quantity || item.qty || 1;
          const price = item.product?.salePrice || item.price || item.amount || '';
          lines.push(`${idx + 1}. ${name}${size} × ${qty} ${price ? `(₹${price})` : ''}`);
        });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }
      lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
      lines.push(`💰 *TOTAL AMOUNT:* ₹${order.total || 0}`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━`);

      const messageBody = lines.join('\n');

      if (accountSid && authToken) {
        const client = twilio(accountSid, authToken);
        const result = await client.messages.create({
          body: messageBody,
          from: fromNumber,
          to: toNumber,
        });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
        console.log(`[Twilio WhatsApp] Successfully sent invoice. SID: ${result.sid}`);
        return res.json({ success: true, sid: result.sid });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      } else {
        console.warn(`[Twilio WhatsApp] Credentials not configured in .env yet. Invoice logged:`);
        console.log(messageBody);
        return res.json({ success: false, message: 'Twilio credentials not configured' });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }
    } catch (err: any) {
      console.error('[Twilio WhatsApp] Error sending order invoice:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send WhatsApp invoice via Twilio' });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    }
  });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });

  app.post("/api/upload-image", rateLimiter, adminAuth, async (req, res) => {
    try {
      const { imageData, filename } = req.body;
      if (!imageData || typeof imageData !== "string") {
        return res.status(400).json({ error: "Invalid or missing imageData" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      const matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = "jpg";
      const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (matches && matches.length === 3) {
        const mimeType = matches[1].toLowerCase();
        if (!allowedMimes.includes(mimeType)) {
          return res.status(400).json({ error: "Unsupported image format" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
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

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      const safeBaseName = filename ? path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_") : "";
      const cleanFilename = safeBaseName ? `${Date.now()}_${safeBaseName}` : `collection-cover-${Date.now()}.${ext}`;

      const filePath = path.resolve(uploadDir, cleanFilename);
      if (!filePath.startsWith(uploadDir)) {
        return res.status(403).json({ error: "Invalid file path traversal attempt" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
      }

      await fs.writeFile(filePath, buffer);
      console.log(`Successfully stored uploaded image on server disk: ${filePath}`);

      res.json({
        success: true,
        url: `/uploads/${cleanFilename}`,
      });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    } catch (err: any) {
      console.error("Image upload handler exception:", err);
      res.status(500).json({ error: "Failed to process image file upload" });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
    }
  });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });

  // Explicitly serve uploaded media files with strict non-executable headers
  app.use("/uploads", express.static(uploadDir, {
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Content-Disposition", "inline");
      res.setHeader("Cache-Control", "public, max-age=86400");
    }
  }));

  // Connect Vite development server or production assets
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting full-stack integration in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
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

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Imperial Server executing on port ${PORT}`);
  });

  // API endpoint to forward order details via EmailJS
  app.post('/api/send-email', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials missing in .env');
        return res.json({ success: false, message: 'EmailJS credentials not configured' });
      }
      const templateParams = {
        order_id: order.id || '',
        customer_name: order.fullName || '',
        customer_email: order.email || '',
        total_amount: order.total?.toString() || '0',
        payment_mode: order.paymentMode || '',
        tracking_code: order.trackingCode || '',
      };
      const emailjs = (await import('emailjs-com')).default;
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('[EmailJS] Email sent, status:', result.status);
      return res.json({ success: true, status: result.status });
    } catch (err: any) {
      console.error('[EmailJS] Error sending email:', err?.message || err);
      return res.status(500).json({ error: 'Failed to send email via EmailJS' });
    }
  });

  // API endpoint to handle paid order notification (WhatsApp + Email)
  app.post('/api/notify-paid', async (req: express.Request, res: express.Response) => {
    try {
      const { order } = req.body as { order: any };
      if (!order) {
        return res.status(400).json({ error: 'Missing order data' });
      }
      const [whResult, emailResult] = await Promise.all([
        (async () => {
          const accountSid = process.env.TWILIO_ACCOUNT_SID;
          const authToken = process.env.TWILIO_AUTH_TOKEN;
          const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
          const toNumber = process.env.ADMIN_WHATSAPP_NUMBER || 'whatsapp:+919785854770';
          const lines: string[] = [];
          lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`*Order ID:* ${order.id || 'N/A'}`);
          lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN')}`);
          lines.push(`*Payment Mode:* ${order.paymentMode || 'Prepaid'}`);
          if (order.trackingCode) lines.push(`*Tracking Code:* ${order.trackingCode}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          lines.push(`👤 *CUSTOMER DETAILS*`);
          lines.push(`*Name:* ${order.fullName || 'N/A'}`);
          lines.push(`*Phone:* ${order.phone || 'N/A'}`);
          if (order.email) lines.push(`*Email:* ${order.email}`);
          lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
          const messageBody = lines.join('\n');
          if (accountSid && authToken) {
            const client = twilio(accountSid, authToken);
            const result = await client.messages.create({ body: messageBody, from: fromNumber, to: toNumber });
            return { success: true, sid: result.sid };
          }
          return { success: false, message: 'Twilio not configured' };
        })(),
        (async () => {
          const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
          const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
          if (!serviceId || !templateId || !publicKey) return { success: false, message: 'EmailJS not configured' };
          const templateParams = {
            order_id: order.id || '',
            customer_name: order.fullName || '',
            customer_email: order.email || '',
            total_amount: order.total?.toString() || '0',
            payment_mode: order.paymentMode || '',
            tracking_code: order.trackingCode || '',
          };
          const emailjs = (await import('emailjs-com')).default;
          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          return { success: true, status: result.status };
        })(),
      ]);
      return res.json({ whResult, emailResult });
    } catch (err: any) {
      console.error('Notification error:', err);
      return res.status(500).json({ error: 'Failed to process paid order notification' });
    }
  });
}

startServer();
