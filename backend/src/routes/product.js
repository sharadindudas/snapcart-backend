import { Router } from "express";
import { allproducts, createproduct, deleteproduct, updateproduct } from "../controllers/product.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router();

productRouter.post("/add", upload.array("images", 5), createproduct);
productRouter.get("/all", allproducts);
productRouter.put("/update/:id", upload.array("images", 5), updateproduct);
productRouter.delete("/remove/:id", deleteproduct);

export default productRouter;
