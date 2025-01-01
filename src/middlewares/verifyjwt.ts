import { RequestHandler } from "express";
import { TokenSchemaType } from "../schemas/auth";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { DecodedPayload } from "../@types/express";

export const verifyjwt: RequestHandler = (req, res, next) => {
    // Get the token from response locals
    const { snapcartToken } = res.locals.cookies as TokenSchemaType;

    // Decode the token
    const decoded = jwt.verify(snapcartToken, JWT_SECRET) as DecodedPayload;

    // Pass the decoded value inside response locals
    res.locals.decoded = decoded;

    // Move to next handler function
    next();
};
