import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { RegisterSchema } from "../validators/auth.validator";
import { register } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/register", validationMiddleware("body", RegisterSchema), register);

export default authRouter;
