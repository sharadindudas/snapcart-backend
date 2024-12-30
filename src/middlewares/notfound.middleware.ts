import { Request, Response, NextFunction } from "express";
import { IResponse } from "../types/types";

export const notfoundmiddleware = (_req: Request, res: Response<IResponse>, _next: NextFunction) => {
    // Return the response
    return res.status(404).json({
        success: false,
        message: "Ouch! Can't find that"
    });
};
