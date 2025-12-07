import { Request, Response, NextFunction, RequestHandler } from "express";

export const AsyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

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
