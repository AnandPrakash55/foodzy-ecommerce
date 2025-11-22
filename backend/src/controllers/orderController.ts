import { Response } from "express";
import { pool } from "../config/db";
import { sendMail } from "../utils/email";
import { AuthedRequest } from "../middleware/auth";

export const getOrders = async (req: AuthedRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const [orders] = await pool.query(
      `SELECT o.id, o.total, o.created_at, 
              GROUP_CONCAT(CONCAT(oi.product_id, ':', oi.quantity, ':', oi.price) SEPARATOR '|') as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const createOrder = async (req: AuthedRequest, res: Response) => {
  const userId = req.userId;
  const { items } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const ids = items.map((i: any) => i.productId);
  const [rows] = await pool.query(
    `SELECT * FROM products WHERE id IN (${ids.map(() => "?").join(",")})`,
    ids
  );
  const products = rows as any[];

  let total = 0;
  const orderItems: { productId: number; quantity: number; price: number }[] =
    [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const price = Number(product.price);
    total += price * item.quantity;
    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      price,
    });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [orderRes] = await conn.query(
      "INSERT INTO orders (user_id, total) VALUES (?, ?)",
      [userId, total]
    );
    const orderId = (orderRes as any).insertId;

    const values = orderItems.map((i) => [
      orderId,
      i.productId,
      i.quantity,
      i.price,
    ]);
    await conn.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
      [values]
    );
    await conn.commit();

    const [userRows] = await pool.query(
      "SELECT email FROM users WHERE id = ?",
      [userId]
    );
    const user = (userRows as any[])[0];

    // Build detailed order items HTML
    const itemsHtml = orderItems.map((item) => {
      const product = products.find(p => p.id === item.productId);
      return `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; text-align: left;">${product?.name || 'Product'}</td>
          <td style="padding: 12px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="padding: 12px; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Order Confirmed!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #333; margin-top: 0;">Thank you for your order!</h2>
          <p style="color: #666; font-size: 16px;">Your order #${orderId} has been successfully placed and confirmed.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #e5e7eb; border-bottom: 2px solid #10b981;">
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Product</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600;">Qty</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600;">Price</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr style="background-color: #10b981; color: white;">
                  <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">Total Amount:</td>
                  <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">$${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">We'll send you a shipping confirmation email as soon as your order ships.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">Thank you for shopping with Foodzy! 🛒</p>
            <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </div>
    `;

    await sendMail(
      user.email,
      `Order Confirmation #${orderId} - Thank You for Your Purchase!`,
      emailHtml
    );

    res.status(201).json({ id: orderId, total, items: orderItems });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Order failed" });
  } finally {
    conn.release();
  }
};
