import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controllers/product.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { GetAllProductsSchema } from "../validators/product.validator";

const productRouter = Router();
productRouter.route("/").post(createProduct).get(validationMiddleware("query", GetAllProductsSchema), getAllProducts);
productRouter.route("/:id").patch(updateProduct).delete(deleteProduct).get(getProductDetails);

export default productRouter;
