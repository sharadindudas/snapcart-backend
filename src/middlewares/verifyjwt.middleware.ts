import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { TokenSchemaType } from "../schemas/common";

export const verifyjwt = (_req: Request, res: Response, next: NextFunction) => {
    // Get token from response locals
    const { token } = res.locals.cookies as TokenSchemaType;

    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET as Secret);

    // Pass the decoded inside response locals
    res.locals.decoded = decoded;

    // Move to next handler function
    return next();
};
