import { Request, Response, NextFunction } from "express";
import { HandlerFunction } from "../@types/express";

// Try catch handler
export const TryCatchHandler = (fn: HandlerFunction) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

// Error handler
export class ErrorHandler extends Error {
    constructor(
        public message: string,
        public statusCode: number
    ) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
