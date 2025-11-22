import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getOrders);
router.post("/", auth, createOrder);

export default router;
