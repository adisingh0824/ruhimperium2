import { Order } from "../types";

/**
 * Build a WhatsApp message with order details and open the Click‑to‑Chat URL.
 * The function opens a new tab/window pointing to WhatsApp's API with the
 * encoded text. No server side is required – the client directly launches the
 * URL.
 */
export function sendOrderToWhatsApp(order: Order) {
  const phone = "919785854770"; // Target WhatsApp Number
  const lines: string[] = [];
  lines.push(`🧾 *RUH IMPERIUM - OFFICIAL ORDER INVOICE*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`*Order ID:* ${order.id}`);
  lines.push(`*Date:* ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
  lines.push(`*Payment Mode:* ${order.paymentMode}`);
  lines.push(`*Tracking Code:* ${order.trackingCode || 'Generated upon dispatch'}`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`👤 *CUSTOMER DETAILS*`);
  lines.push(`*Name:* ${order.fullName}`);
  lines.push(`*Phone:* ${order.phone}`);
  if (order.email) lines.push(`*Email:* ${order.email}`);
  lines.push(`*Delivery Address:* ${order.address}, PIN: ${order.pincode}`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🛍️ *ORDER ITEMS*`);
  (order.items ?? []).forEach((item, idx) => {
    const size = item.selectedSize ? ` [Size: ${item.selectedSize}]` : "";
    const name = item.product?.name || "Product";
    const price = item.product?.price ? `₹${item.product.price}` : "";
    lines.push(`${idx + 1}. ${name}${size} × ${item.quantity} ${price ? `(${price})` : ''}`);
  });
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`💰 *TOTAL AMOUNT:* ₹${order.total}`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Thank you for ordering with Ruh Imperium._`);

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

  try {
    const newWindow = window.open(url, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      // Fallback if popup is blocked
      window.location.href = url;
    }
  } catch (err) {
    window.location.href = url;
  }
}
