import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/handlers";
import { ValidationError } from "yup";

export const errormiddleware = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    // Log all the errors
    console.error(err.stack);

    // Set default error values
    err.message = err.message || "Internal Server Error Occurred";
    err.statusCode = err.statusCode || 500;

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

            return res.status(400).json({
                success: false,
                message
            });
        } else {
            err = new ErrorHandler(err.errors[0], 400);
        }
    }

    // Return the response
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
