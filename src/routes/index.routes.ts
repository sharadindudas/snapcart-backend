import { Router } from "express";
import productRouter from "./product.routes";
import healthRouter from "./health.routes";
import authRouter from "./auth.routes";

const router = Router();
router.use("/health", healthRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
