import { RequestHandler } from "express";

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
    // Return the response
    res.status(404).json({
        success: false,
        message: "Oops! Route not found"
    });
};
