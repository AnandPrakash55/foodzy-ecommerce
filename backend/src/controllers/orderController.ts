import { Response } from "express";
import { pool } from "../config/db";
import { sendMail } from "../utils/email";
import { AuthedRequest } from "../middleware/auth";

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

    await sendMail(
      user.email,
      `Order Confirmation #${orderId}`,
      `<p>Thank you for your order #${orderId}.</p><p>Total: $${total.toFixed(
        2
      )}</p>`
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
