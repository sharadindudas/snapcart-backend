import { Router } from "express";
import { validator } from "../middlewares/validator";
import { LoginSchema, SendOtpSchema, SignupSchema, VerifyOtpSchema, TokenSchema } from "../schemas/auth";
import { login, logout, sendotp, signup, verifyotp } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", validator("body", SignupSchema), signup);
authRouter.get("/send-otp", validator("query", SendOtpSchema), sendotp);
authRouter.put("/verify-otp", validator("query", VerifyOtpSchema), verifyotp);
authRouter.post("/login", validator("body", LoginSchema), login);
authRouter.get("/logout", validator("cookies", TokenSchema) , logout)

export default authRouter;
