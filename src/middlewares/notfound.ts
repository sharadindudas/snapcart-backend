import { RequestHandler } from "express";

export const notfoundmiddleware: RequestHandler = (req, res, next) => {
    // Return the response
    res.status(404).json({
        success: false,
        message: "Ouch! Can't find that"
    });
};
