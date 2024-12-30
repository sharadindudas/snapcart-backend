import { NextFunction, Request, Response } from "express";
import { DecodedPayload } from "../types/types";
import { ErrorHandler } from "../utils/handlers";

export const verifyadmin = (_req: Request, res: Response, next: NextFunction) => {
    // Get decoded from response locals
    const decoded = res.locals.decoded as DecodedPayload;

    // Check if the user is admin or not
    if (decoded.role !== "admin") {
        throw new ErrorHandler("User is not an admin", 401);
    }

    // Move to next handler function
    return next();
};
