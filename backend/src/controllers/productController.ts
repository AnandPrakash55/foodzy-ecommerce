import { Request, Response } from "express";
import { pool } from "../config/db";

export const getProducts = async (req: Request, res: Response) => {
  const { popular, deal } = req.query;
  let sql = "SELECT * FROM products WHERE 1=1";
  if (popular) sql += " AND is_popular = 1";
  if (deal) sql += " AND is_deal_of_day = 1";

  const [rows] = await pool.query(sql);
  res.json(rows);
};

export const getProductById = async (req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  const product = (rows as any[])[0];
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};
