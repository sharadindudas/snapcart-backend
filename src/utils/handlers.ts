import { Request, Response, NextFunction } from "express";
import { HandlerFunctionType } from "../types/types";

// Try catch handler
export const TryCatchHandler = (fn: HandlerFunctionType) => (req: Request, res: Response, next: NextFunction) => {
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
