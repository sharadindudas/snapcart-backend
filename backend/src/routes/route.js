import { Router } from "express";
import productRouter from "./product.js";

const router = Router();

router.use("/product", productRouter);

export default router;
