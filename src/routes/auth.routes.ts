import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { LoginSchema, RegisterSchema } from "../validators/auth.validator";
import { login, register } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/register", validationMiddleware("body", RegisterSchema), register);
authRouter.post("/login", validationMiddleware("body", LoginSchema), login);

export default authRouter;
