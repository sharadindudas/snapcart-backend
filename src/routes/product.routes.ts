import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controllers/product.controller";

const productRouter = Router();
productRouter.route("/").post(createProduct).get(getAllProducts);
productRouter.route("/:id").patch(updateProduct).delete(deleteProduct).get(getProductDetails);

export default productRouter;
