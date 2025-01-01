import { Request, Response, NextFunction, RequestHandler } from "express";

declare global {
    namespace Express {
        interface Locals {
            body?: any;
            params?: any;
            query?: any;
            cookies?: any;
            headers?: any;
            decoded?: DecodedPayload;
        }
    }
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: unknown;
}

export type HandlerFunction<
    Params = Record<string, any>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = Record<string, any>
> = RequestHandler<Params, ResBody, ReqBody, ReqQuery, Locals>;

export type RequestLocations = "body" | "params" | "query" | "cookies" | "headers";

export type DecodedPayload = {
    id: string;
    role: "user" | "admin";
    iat: number;
    exp: number;
    iss: string;
};
