import { Request, Response } from "express";
import { pool } from "../config/db";
import { generateOTP } from "../utils/otp";
import { sendMail } from "../utils/email";
import jwt from "jsonwebtoken";

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const code = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await pool.query(
    "INSERT INTO otps (email, code, expires_at) VALUES (?, ?, ?)",
    [email, code, expiresAt]
  );

  await sendMail(
    email,
    "Your OTP Code",
    `<p>Your OTP is <b>${code}</b>. It expires in 5 minutes.</p>`
  );

  res.json({ message: "OTP sent" });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ message: "Email & code required" });

  const [rows] = await pool.query(
    "SELECT * FROM otps WHERE email = ? AND code = ? AND used = 0 ORDER BY id DESC LIMIT 1",
    [email, code]
  );
  const otpRow = (rows as any[])[0];

  if (!otpRow || new Date(otpRow.expires_at).getTime() < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await pool.query("UPDATE otps SET used = 1 WHERE id = ?", [otpRow.id]);

  const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  let user = (userRows as any[])[0];
  if (!user) {
    const [result] = await pool.query(
      "INSERT INTO users (email) VALUES (?)",
      [email]
    );
    const userId = (result as any).insertId;
    const [newUserRows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    user = (newUserRows as any[])[0];
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
};
