import { Router } from "express";
import { login, logout, sendotp, signup, verifyotp } from "../controllers/auth.controller";
import { validatormiddleware } from "../middlewares/validator.middleware";
import { LoginSchema, SendOtpSchema, SignupSchema, VerifyOtpSchema } from "../schemas/auth.schema";
import { TokenSchema } from "../schemas/common";

const authRouter = Router();

authRouter.post("/signup", validatormiddleware("body", SignupSchema), signup);
authRouter.get("/send-otp", validatormiddleware("query", SendOtpSchema), sendotp);
authRouter.put("/verify-otp", validatormiddleware("query", VerifyOtpSchema), verifyotp);
authRouter.post("/login", validatormiddleware("body", LoginSchema), login);
authRouter.get("/logout", validatormiddleware("cookies", TokenSchema), logout);

export default authRouter;
