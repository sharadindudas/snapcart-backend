import { ErrorRequestHandler } from "express";
import { ErrorHandler } from "../utils/handlers";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    // Log all errors
    console.error(err);

    // Set default error values
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;

    // Handling mongodb cast error
    if (err.name === "CastError") {
        err = new ErrorHandler(`Resource not found. Invalid ${err.path}`, 400);
    }

    // Return the response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
