import { RequestHandler, Response } from "express";
import { UserModel } from "../models/user";
import { LoginSchemaType, SendOtpSchemaType, SignupSchemaType, VerifyOtpSchemaType } from "../schemas/auth";
import { ErrorHandler, TryCatchHandler } from "../utils/handlers";
import { phoneparser } from "../utils/validators";
import { ApiResponse } from "../@types/express";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail";
import { verifyotptemplate } from "../templates/verifyotp";
import { redisClient } from "../utils/redis";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { ENV, JWT_SECRET } from "../config/config";

// Signup
export const signup = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const { name, email, phone, password } = res.locals.body as SignupSchemaType;

    // Check if the user already exists in the db or not
    const userExists = await UserModel.findOne({
        $or: [{ email }, { phone: phoneparser(phone).number }]
    });
    if (userExists) {
        throw new ErrorHandler("User already exists", 409);
    }

    // Create a new user
    const newuser = await UserModel.create({
        name,
        email,
        phone: phoneparser(phone).number,
        password
    });

    // Remove sensitive data
    newuser.password = undefined!;
    newuser.__v = undefined!;

    // Return the response
    res.status(201).json({
        success: true,
        message: "User is registered successfully",
        data: newuser
    });
});

// Send otp
export const sendotp = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const { userid } = res.locals.query as SendOtpSchemaType;

    // Check if the user exists in the db or not
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

    // Check if the email is sent successfully to the user or not
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    }

    // Store the verify otp and otp expiry in redis
    await redisClient.set(`verifyOtp:${userid}`, verifyOtp, { EX: 10 * 60 });
    await redisClient.set(`verifyOtpExpiry:${userid}`, verifyOtpExpiry.toISOString(), { EX: 10 * 60 });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Otp is sent successfully"
    });
});

// Verify otp
export const verifyotp = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
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

    // Validation of verify otp and otp expiry
    const verifyOtp = await redisClient.get(`verifyOtp:${userid}`);
    const verifyOtpExpiry = await redisClient.get(`verifyOtpExpiry:${userid}`);
    if (!verifyOtp || !verifyOtpExpiry || otp !== verifyOtp || new Date(Date.now()) > new Date(verifyOtpExpiry)) {
        throw new ErrorHandler("Invalid Otp or Otp has expired", 403);
    }

    // Verify the user and remove the verify otp and otp expiry from redis
    userExists.isVerified = true;
    await userExists.save({ validateBeforeSave: false });
    await redisClient.del(`verifyOtp:${userid}`);
    await redisClient.del(`verifyOtpExpiry:${userid}`);

    // Return the response
    res.status(200).json({
        success: true,
        message: "Otp is verified successfully"
    });
});

// Login
export const login = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const { identity, password } = res.locals.body as LoginSchemaType;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({
        $or: [{ email: identity }, { phone: phoneparser(identity).number }]
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

    // Remove sensitive data
    userExists.password = undefined!;
    userExists.__v = undefined!;

    // Create a cookie and return the response
    res.cookie("snapcartToken", token, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
        .status(200)
        .json({
            success: true,
            message: "User logged in successfully",
            data: userExists
        });
});

// Logout
export const logout: RequestHandler = (req, res: Response<ApiResponse>, next) => {
    // Clear the cookie and return the response
    res.clearCookie("snapcartToken").status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};
