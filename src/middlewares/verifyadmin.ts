import { RequestHandler } from "express";
import { DecodedPayload } from "../@types/express";
import { ErrorHandler } from "../utils/handlers";

export const verifyadmin: RequestHandler = (req, res, next) => {
    // Get data from response locals
    const decoded = res.locals.decoded as DecodedPayload;

    // Check if the user is admin or not
    if (decoded.role !== "admin") {
        throw new ErrorHandler("User is not an admin", 403);
    }

    // Move to next handler function
    next();
};
