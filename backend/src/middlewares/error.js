import { ErrorHandler } from "../utils/handlers.js";

export const errormiddleware = (err, req, res, next) => {
    // Log all the errors
    console.error(err);

    // Set default error values
    err.message ||= "Internal Server Error Occured";
    err.statusCode ||= 500;

    // Wrong mongodb id
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Return the error response
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
