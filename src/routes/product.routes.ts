import { Router } from "express";
import { upsertProduct, deleteProduct, getAllProducts, getProductDetails } from "../controllers/product.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { GetAllProductsSchema, ProductIdSchema, UpsertProductSchema } from "../validators/product.validator";

const productRouter = Router();
productRouter
    .route("/")
    .patch(validationMiddleware("body", UpsertProductSchema), upsertProduct)
    .get(validationMiddleware("query", GetAllProductsSchema), getAllProducts);
productRouter
    .route("/:id")
    .delete(validationMiddleware("params", ProductIdSchema), deleteProduct)
    .get(validationMiddleware("params", ProductIdSchema), getProductDetails);

export default productRouter;
