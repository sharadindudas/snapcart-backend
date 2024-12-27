import { Router } from "express";
import { createproduct } from "../controllers/product.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router();

productRouter.route("/add").post(upload.array("images"), createproduct);

export default productRouter;
