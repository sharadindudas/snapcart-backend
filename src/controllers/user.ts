import { Response } from "express";
import { ApiResponse, DecodedPayload } from "../@types/express";
import { TryCatchHandler, ErrorHandler } from "../utils/handlers";
import { UserModel } from "../models/user";
import { UserIdSchemaType } from "../schemas/common";

// Get user details
export const getuserdetails = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const decoded = res.locals.decoded as DecodedPayload;

    // Get the user details
    const user = await UserModel.findById(decoded.id).select("-password -__v");

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched user details successfully",
        data: user
    });
});

// Get all users (admin)
export const getallusers = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get all the users
    const users = await UserModel.find().select("-password -__v");

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all users successfully",
        data: users
    });
});

// Get single user (admin)
export const getsingleuser = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const { id } = res.locals.params as UserIdSchemaType;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(id).select("-password -__v");
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched user details successfully",
        data: userExists
    });
});

// Delete a user (admin)
export const deleteuser = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const { id } = res.locals.params as UserIdSchemaType;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(id);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Remove the user from db
    await userExists.deleteOne();

    // Return the response
    res.status(200).json({
        success: true,
        message: "Deleted the user successfully"
    });
});
