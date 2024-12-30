import { TryCatchHandler, ErrorHandler } from "../utils/handlers";
import { UserModel } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { IResponse } from "../types/types";
import { phoneParser } from "../utils/validators";
import { LoginSchemaType, SendOtpSchemaType, SignupSchemaType, VerifyOtpSchemaType } from "../schemas/auth.schema";
import { TokenSchemaType } from "../schemas/common";
import { redisClient } from "../utils/redis";
import { sendMail } from "../utils/sendMail";
import { verifyotptemplate } from "../templates/verifyotp";
import crypto from "crypto";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { ENV, JWT_SECRET } from "../config/config";

// Signup
export const signup = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get data from response locals
    const { name, email, phone, password } = res.locals.body as SignupSchemaType;

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({
        $or: [{ email }, { phone: phoneParser(phone).number }]
    });
    if (userExists) {
        throw new ErrorHandler("User already exists Please Login", 409);
    }

    // Create a new user
    const newUser = await UserModel.create({ name, email, phone: phoneParser(phone).number, password });

    // Remove sensitive data
    newUser.password = undefined!;
    newUser.__v = undefined!;

    // Return the response
    return res.status(201).json({
        success: true,
        message: "User is registered successfully",
        data: newUser
    });
});

// Send otp
export const sendotp = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get data from response locals
    const { userid } = res.locals.query as SendOtpSchemaType;

    // Check if the user exists in the db or notc
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is already verified or not
    if (userExists.isVerified) {
        throw new ErrorHandler("User is already verified", 409);
    }

    // Generate the verify otp and otp expiry
    const verifyOtp = crypto.randomInt(100000, 999999).toString().padStart(6, "0");
    const verifyOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Send the otp to the user via email
    const emailResponse = await sendMail({
        email: userExists.email,
        title: "SnapCart | Verification Code",
        body: verifyotptemplate(verifyOtp)
    });

    // Check if the email is sent successfully or not
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    } else {
        // Store the verify otp and otp expiry in redis
        await redisClient.set(`verifyOtp:${userid}`, verifyOtp, { EX: 10 * 60 });
        await redisClient.set(`verifyOtpExpiry:${userid}`, verifyOtpExpiry.toISOString(), { EX: 10 * 60 });

        // Return the response
        return res.status(200).json({
            success: true,
            message: "Otp is sent successfully"
        });
    }
});

// Verify otp
export const verifyotp = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get data from response locals
    const { userid, otp } = res.locals.query as VerifyOtpSchemaType;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is already verified or not
    if (userExists.isVerified) {
        throw new ErrorHandler("User is already verified", 409);
    }

    // Get the verify otp and otp expiry from redis
    const verifyOtp = await redisClient.get(`verifyOtp:${userid}`);
    const verifyOtpExpiry = await redisClient.get(`verifyOtpExpiry:${userid}`);

    // Validation of otp
    if (!verifyOtp || !verifyOtpExpiry || otp !== verifyOtp || new Date(Date.now()) > new Date(verifyOtpExpiry)) {
        throw new ErrorHandler("Invalid Otp or Otp has expired", 403);
    }

    // Verify the user and remove verify otp and otp expiry from redis
    userExists.isVerified = true;
    await userExists.save({ validateBeforeSave: false });
    await redisClient.del(`verifyOtp:${userid}`);
    await redisClient.del(`verifyOtpExpiry:${userid}`);

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Otp is verified successfully"
    });
});

// Login
export const login = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get data from response locals
    const { identity, password } = res.locals.body as LoginSchemaType;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({
        $or: [{ email: identity }, { phone: phoneParser(identity).number }]
    });
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is verified or not
    if (!userExists.isVerified) {
        throw new ErrorHandler("Please verify your account", 403);
    }

    // Validation of password
    const isValidPassword = await userExists.comparePassword(password);
    if (!isValidPassword) {
        throw new ErrorHandler("Invalid Credentials", 401);
    }

    // Remove sensitive data
    userExists.password = undefined!;
    userExists.__v = undefined!;

    // Generate a jwt token
    const token = jwt.sign(
        {
            id: userExists._id,
            role: userExists.role
        } as JwtPayload,
        JWT_SECRET as Secret,
        {
            issuer: "SnapCart",
            expiresIn: "30d"
        } as SignOptions
    );

    // Create a cookie and return the response
    return res
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: ENV === "production"
        })
        .status(200)
        .json({
            success: true,
            message: "User logged in successfully",
            data: userExists
        });
});

// Logout
export const logout = (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get the token from response locals
    const { token } = res.locals.cookies as TokenSchemaType;

    // Validation of token
    const decoded = jwt.verify(token, JWT_SECRET as Secret);
    if (!decoded) {
        throw new ErrorHandler("Invalid Token or Token has expired", 403);
    }

    // Remove the cookie and return the response
    return res.clearCookie("token").status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};
