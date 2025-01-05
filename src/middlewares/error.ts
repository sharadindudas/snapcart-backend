import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/handlers";
import { ValidationError } from "yup";
import { MulterError } from "multer";

export const errormiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction): void => {
    // Log all the errors
    console.error(err);

    // Set default err values
    err.message ||= "Internal Server Error Occured";
    err.statusCode ||= 500;

    // Invalid jwt error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token. Please log in again.";
        err = new ErrorHandler(message, 401);
    }

    // Expired jwt error
    if (err.name === "TokenExpiredError") {
        const message = "Session expired. Please log in again.";
        err = new ErrorHandler(message, 401);
    }

    // Yup validation error
    if (err instanceof ValidationError) {
        let message: string[] | string = [];
        if (err.errors.length > 1) {
            err.errors.forEach((e: string) => {
                message.push(e);
            });

            res.status(400).json({
                success: false,
                message
            });
        } else {
            err = new ErrorHandler(err.errors[0], 400);
        }
    }

    // Multer errors
    if (err instanceof MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            err = new ErrorHandler("File size too large. Maximum size is 5MB", 400);
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            err = new ErrorHandler("Unexpected field name in form data", 400);
        }
    }

    // Return the response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
