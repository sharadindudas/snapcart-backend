import { ErrorHandler } from "../utils/handlers.js";

export const errormiddleware = (err, req, res, next) => {
    // Console all the errors
    console.error(err);

    // Default error values
    err.message ||= "Internal Server Error Occurred";
    err.statusCode ||= 500;

    // Wrong mongodb id
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
