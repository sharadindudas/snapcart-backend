import { JWT_EXPIRY, JWT_SECRET, NODE_ENV } from "../config";
import { UserModel } from "../models/user.model";
import { UserRole } from "../types";
import { AsyncHandler, ErrorHandler } from "../utils/handlers";
import { LoginSchema, RegisterSchema } from "../validators/auth.validator";
import jwt from "jsonwebtoken";

// Register
export const register = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { name, email, password } = res.locals as RegisterSchema;

    // Check if the user already exists or not
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new ErrorHandler("User already exists", 409);
    }

    // Create a new user
    const newUser = await UserModel.create({
        name,
        email,
        password,
        role: UserRole.CUSTOMER
    });

    // Remove the password
    newUser.password = undefined!;

    // Return the response
    res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        }
    });
});

// Login
export const login = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { email, password } = res.locals as LoginSchema;

    // Check if the user exists or not
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }

    // Check if the user is verified or not
    if (!user.isVerified) {
        throw new ErrorHandler("Please verify your email", 401);
    }

    // Check if the password is valid or not
    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) {
        throw new ErrorHandler("Invalid credentials", 403);
    }

    // Generate the token
    const token = await jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            issuer: "Snapcart",
            expiresIn: JWT_EXPIRY
        }
    );

    // Remove the password and update the last login
    user.password = undefined!;
    user.lastLogin = new Date();

    // Set the token on cookie and return the response
    res.cookie("snapcartToken", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
        .status(200)
        .json({
            success: true,
            message: "Logged in successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
});
