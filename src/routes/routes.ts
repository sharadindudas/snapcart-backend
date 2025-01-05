import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import productRouter from "./product";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;
