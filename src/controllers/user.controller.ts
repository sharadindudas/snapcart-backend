import { Request, Response, NextFunction } from "express";
import { ErrorHandler, TryCatchHandler } from "../utils/handlers";
import { DecodedPayload, IResponse } from "../types/types";
import { UserModel } from "../models/user.model";
import { UserIdSchemaType } from "../schemas/user.schema";

// Get user details
export const getuserdetails = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get the decoded from response locals
    const decoded = res.locals.decoded as DecodedPayload;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(decoded.id).select("-password -__v");
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Fetched user details successfully",
        data: userExists
    });
});

// Get specific user
export const getsingleuser = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get user id from response locals
    const { id } = res.locals.params as UserIdSchemaType;

    // Check if the user exists in the db or not
    const userExists = await UserModel.findById(id).select("-password -__v");
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Fetched user details successfully",
        data: userExists
    });
});

// Get all users
export const getallusers = TryCatchHandler(async (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Get all the users from db
    const users = await UserModel.find().select("-password -__v");

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Fetched all users successfully",
        data: users
    });
});
