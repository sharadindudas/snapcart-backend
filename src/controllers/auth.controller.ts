import crypto from "crypto";
import { UserModel } from "../models/user.model";
import { AsyncHandler, ErrorHandler } from "../utils/handlers";
import { redisInstance } from "../utils/redis";
import { RegisterSchema } from "../validators/auth.validator";

// Register
export const register = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { name, email, password } = res.locals as RegisterSchema;

    // Check if the user already exists or not
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new ErrorHandler("Email already in use.", 409);
    }

    // Create a new user
    const newUser = await UserModel.create({
        name,
        email,
        authProviders: {
            local: {
                password,
                isVerified: false
            }
        },
        isVerified: false
    });

    // Generate email verification token and store it in redis
    const redis = redisInstance();
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    await redis.setex(`verifyEmail:${newUser._id}`, 24 * 60 * 60, emailVerificationToken);

    // Return the response
    res.status(201).json({
        success: true,
        message: "Registration successful"
    });
});
