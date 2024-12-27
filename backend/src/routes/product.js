import { Router } from "express";
import { createproduct, allproducts, deleteproduct } from "../controllers/product.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router();

productRouter.route("/add").post(upload.array("images"), createproduct);
productRouter.route("/all").get(allproducts);
productRouter.route("/remove/:id").delete(deleteproduct);

export default productRouter;
