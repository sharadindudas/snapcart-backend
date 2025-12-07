import { Router } from "express";
import productRouter from "./product.routes";
import healthRouter from "./health.routes";

const router = Router();
router.use("/health", healthRouter);
router.use("/products", productRouter);

export default router;
