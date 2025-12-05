import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controllers";

const router = Router();
router.get("/", getAllProducts);
router.post("/new", createProduct);

export default router;
