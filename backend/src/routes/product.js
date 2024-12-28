import { Router } from "express";
import { createproduct, allproducts, deleteproduct, getproduct } from "../controllers/product.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router();

productRouter.get("/all", allproducts);
productRouter.get("/:id", getproduct);
productRouter.post("/add", upload.array("images"), createproduct);
productRouter.delete("/remove/:id", deleteproduct);

export default productRouter;
