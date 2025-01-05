import { Router } from "express";
import { createproduct, deleteproduct, getallproducts, getproductdetails } from "../controllers/product";
import { upload } from "../middlewares/multer";
import { validator } from "../middlewares/validator";
import { ProductIdSchema, ProductSchema } from "../schemas/product";
import { TokenSchema } from "../schemas/auth";
import { verifyjwt } from "../middlewares/verifyjwt";
import { verifyadmin } from "../middlewares/verifyadmin";

const productRouter = Router();

productRouter.get("/all", getallproducts);
productRouter.post(
    "/add",
    validator("cookies", TokenSchema),
    verifyjwt,
    verifyadmin,
    upload.array("images"),
    validator("body", ProductSchema),
    createproduct
);
productRouter.get("/get/:id", validator("cookies", TokenSchema), verifyjwt, verifyadmin, validator("params", ProductIdSchema), getproductdetails);
productRouter.delete("/remove/:id", validator("cookies", TokenSchema), verifyjwt, verifyadmin, validator("params", ProductIdSchema), deleteproduct);

export default productRouter;
