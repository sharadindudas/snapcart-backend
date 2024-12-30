import { Request, Response, NextFunction } from "express";

export interface IResponse {
    success: boolean;
    message: string;
    data?: unknown;
}

export type HandlerFunctionType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<IResponse, Record<string, unknown>>>;

export type RequestLocations = "body" | "params" | "query" | "cookies" | "headers";

export interface DecodedPayload {
    id: string;
    role: "user" | "admin";
    iat: number;
    exp: number;
    iss: string;
}
