// Vercel Serverless Function: /api/notify-paid
// Sends WhatsApp (Twilio) + Email (Nodemailer/EmailJS) notifications on new orders.
// All 4 legacy path aliases are handled by Vercel rewrites in vercel.json.

import type { IncomingMessage, ServerResponse } from "http";
import twilio from "twilio";
import nodemailer from "nodemailer";

// Minimal Vercel-compatible request/response types (avoids @vercel/node package)
type VercelRequest = IncomingMessage & { body: any; query: Record<string, string | string[]> };
type VercelResponse = ServerResponse & {
  json: (body: any) => VercelResponse;
  status: (code: number) => VercelResponse;
  end: (body?: any) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
};

// --- WhatsApp invoice formatter ---
function formatWhatsAppInvoice(order: any): string {
  const lines: string[] = [];
  lines.push(`🧾 *RUH IMPERIUM - NEW ORDER INVOICE*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`*Order ID:* ${order.id || "N/A"}`);
  lines.push(
    `*Date:* ${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`
  );
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
    lines.push(
      `*Address:* ${order.address}${order.pincode ? `, PIN: ${order.pincode}` : ""}`
    );
  }
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🛍️ *ORDER ITEMS*`);

  if (order.items && Array.isArray(order.items)) {
    order.items.forEach((item: any, idx: number) => {
      const name =
        item.product?.name || item.name || item.title || `Item ${idx + 1}`;
      const size = item.selectedSize ? ` [${item.selectedSize}]` : "";
      const qty = item.quantity || item.qty || 1;
      const price = item.product?.salePrice || item.price || item.amount || "";
      lines.push(
        `${idx + 1}. ${name}${size} × ${qty} ${price ? `(₹${price})` : ""}`
      );
    });
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  const total = order.total || order.orderTotal || 0;
  lines.push(`💰 *TOTAL: ₹${total}*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Dispatched from Kannauj, Uttar Pradesh_`);
  lines.push(`_Ruh Imperium — Imperial Perfumery & Attar Registry_`);

  return lines.join("\n");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { order } = req.body || {};
  if (!order) {
    return res.status(400).json({ error: "Missing order payload" });
  }

  const results: { whatsapp?: any; email?: any } = {};

  // ─── 1. WhatsApp via Twilio ───────────────────────────────────────────────
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber =
    process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+17372508034";
  const toNumber =
    process.env.ADMIN_WHATSAPP_NUMBER || "whatsapp:+919785854770";

  if (accountSid && authToken) {
    try {
      const client = twilio(accountSid, authToken);
      const msg = await client.messages.create({
        body: formatWhatsAppInvoice(order),
        from: fromNumber.startsWith("whatsapp:")
          ? fromNumber
          : `whatsapp:${fromNumber}`,
        to: toNumber.startsWith("whatsapp:")
          ? toNumber
          : `whatsapp:${toNumber}`,
      });
      console.log(`[Twilio] Sent OK — SID: ${msg.sid}`);
      results.whatsapp = { success: true, sid: msg.sid, provider: "twilio" };
    } catch (err: any) {
      console.warn(`[Twilio] Error ${err.code}: ${err.message}`);
      if (err.code === 21654 || err.code === 63016) {
        console.warn(
          `[Twilio] Sandbox session closed. Send "join twilio-trial" from ${toNumber} to ${fromNumber} to reopen.`
        );
      }
      // CallMeBot fallback
      if (process.env.CALLMEBOT_API_KEY) {
        try {
          const phone = toNumber.replace(/[^0-9]/g, "");
          const body = encodeURIComponent(formatWhatsAppInvoice(order));
          await fetch(
            `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${body}&apikey=${process.env.CALLMEBOT_API_KEY}`
          );
          results.whatsapp = { success: true, provider: "callmebot" };
        } catch (cbErr: any) {
          results.whatsapp = {
            success: false,
            error: err.message,
            fallbackError: cbErr.message,
          };
        }
      } else {
        results.whatsapp = {
          success: false,
          error: err.message,
          code: err.code,
        };
      }
    }
  } else {
    results.whatsapp = {
      success: false,
      message: "Twilio credentials not set in environment variables",
    };
  }

  // ─── 2. Email via Nodemailer (Gmail) ─────────────────────────────────────
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const gmailPass =
    process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const adminEmails =
    process.env.ADMIN_EMAIL ||
    "ruhimperiun9@gmail.com, sadityasingh7990@gmail.com";

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      const itemsHtml = (order.items || [])
        .map((item: any) => {
          const name = item.product?.name || item.name || "Fragrance";
          const size = item.selectedSize ? ` (${item.selectedSize})` : "";
          const qty = item.quantity || 1;
          const price = item.product?.salePrice || item.price || 0;
          return `<li style="margin-bottom:8px"><strong>${qty}×</strong> ${name}${size} — ₹${price * qty}</li>`;
        })
        .join("");

      const recipients = [adminEmails];
      if (order.email && order.email.includes("@")) {
        recipients.push(order.email);
      }

      const info = await transporter.sendMail({
        from: `"Ruh Imperium Orders" <${gmailUser}>`,
        to: recipients.join(", "),
        subject: `[RUH IMPERIUM] Order #${order.id} Confirmed (${order.paymentMode || "COD"})`,
        html: `
          <div style="font-family:'Georgia',serif;color:#1a1715;max-width:620px;margin:0 auto;padding:24px;border:1px solid #D4BC96;border-radius:12px;background:#FAF9F5">
            <h1 style="text-align:center;text-transform:uppercase;letter-spacing:3px;color:#1a1715;margin-bottom:4px">RUH IMPERIUM</h1>
            <p style="text-align:center;color:#9A7B4F;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-top:0">Imperial Perfumery &amp; Attar Registry</p>
            <hr style="border:0;border-top:1px solid #E6D8C3;margin:20px 0"/>
            <h3>Order #${order.id}</h3>
            <p><strong>Customer:</strong> ${order.fullName || "Valued Client"}</p>
            <p><strong>Email:</strong> ${order.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${order.phone || "N/A"}</p>
            <p><strong>Payment:</strong> ${order.paymentMode || "Cash on Delivery"}</p>
            ${order.trackingCode ? `<p><strong>Tracking:</strong> <code>${order.trackingCode}</code></p>` : ""}
            <h4>Delivery Address</h4>
            <p style="background:#fff;padding:12px;border-radius:6px;border:1px solid #eee">${order.address || "N/A"}<br><strong>Pincode:</strong> ${order.pincode || "N/A"}</p>
            <h4>Order Items</h4>
            <ul style="padding-left:20px">${itemsHtml || "<li>Standard Order Items</li>"}</ul>
            <div style="text-align:right;margin-top:24px;padding:16px;background:#1a1715;color:#FAF9F5;border-radius:8px">
              <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#D4BC96">Total Order Value</div>
              <div style="font-size:24px;font-weight:bold">₹${order.total || 0}</div>
            </div>
            <p style="text-align:center;font-size:11px;color:#888;margin-top:24px">Automated notification from Ruh Imperium Logistics • Dispatched from Kannauj, India</p>
          </div>
        `,
      });

      console.log(`[Nodemailer] Email sent — MessageId: ${info.messageId}`);
      results.email = {
        success: true,
        messageId: info.messageId,
        provider: "nodemailer",
      };
    } catch (mailErr: any) {
      console.error(`[Nodemailer] Error:`, mailErr?.message);
      results.email = { success: false, error: mailErr?.message };
    }
  } else {
    // EmailJS REST fallback
    const ejsServiceId =
      process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
    const ejsTemplateId =
      process.env.VITE_EMAILJS_TEMPLATE_ID ||
      process.env.EMAILJS_TEMPLATE_ID;
    const ejsPublicKey =
      process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;

    if (ejsServiceId && ejsTemplateId && ejsPublicKey) {
      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: ejsServiceId,
              template_id: ejsTemplateId,
              user_id: ejsPublicKey,
              template_params: {
                order_id: order.id || "",
                customer_name: order.fullName || "",
                customer_email: order.email || "",
                customer_phone: order.phone || "",
                order_total: `₹${order.total || 0}`,
                payment_mode: order.paymentMode || "",
                tracking_code: order.trackingCode || "",
                shipping_address: `${order.address || ""}, PIN: ${order.pincode || ""}`,
              },
              ...(process.env.EMAILJS_PRIVATE_KEY
                ? { accessToken: process.env.EMAILJS_PRIVATE_KEY }
                : {}),
            }),
          }
        );
        if (response.ok) {
          results.email = { success: true, provider: "emailjs-rest" };
        } else {
          const text = await response.text();
          results.email = { success: false, error: text, provider: "emailjs-rest" };
        }
      } catch (ejsErr: any) {
        results.email = { success: false, error: ejsErr?.message };
      }
    } else {
      results.email = {
        success: false,
        message:
          "No email credentials configured. Add GMAIL_USER + GMAIL_APP_PASSWORD or EMAILJS_* vars to Vercel environment.",
      };
    }
  }

  return res.json({ success: true, ...results });
}
