import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order } = req.body;

  if (!order) {
    return res.status(400).json({ message: 'Order data is missing' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'ruhimperiun9@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const itemsHtml = order.items.map(item => 
      `<li>${item.quantity}x <strong>${item.product.name}</strong> (${item.selectedSize}) - ₹${item.product.salePrice * item.quantity}</li>`
    ).join('');

    const mailOptions = {
      from: `"Ruh Imperium Orders" <${process.env.GMAIL_USER || 'ruhimperiun9@gmail.com'}>`,
      to: 'ruhimperiun9@gmail.com, saditya7990@gmail.com',
      subject: `[NEW ORDER] ${order.id} - ${order.fullName}`,
      html: `
        <div style="font-family: 'Georgia', serif; color: #111111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h1 style="text-align: center; text-transform: uppercase; letter-spacing: 2px;">Ruh Imperium</h1>
          <h2 style="text-align: center; color: #84663B; font-weight: normal;">New Order Received</h2>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <h3>Order Details: ${order.id}</h3>
          <p><strong>Customer:</strong> ${order.fullName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          
          <h3>Shipping Address</h3>
          <p>${order.address}<br>Pincode: ${order.pincode}</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <h3>Items Purchased</h3>
          <ul>
            ${itemsHtml}
          </ul>
          
          <h2 style="text-align: right;">Total Paid: ₹${order.total}</h2>
          <p style="text-align: right; color: #666; font-size: 12px;">Payment Mode: ${order.paymentMode}</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="text-align: center; font-size: 12px; color: #999;">This is an automated notification from your website.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: error.message });
  }
}
