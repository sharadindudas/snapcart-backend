import "dotenv-flow/config";

export const NODE_ENV = process.env.NODE_ENV!,
    PORT = process.env.PORT!,
    SERVER_URL = process.env.SERVER_URL!,
    DATABASE_URL = process.env.DATABASE_URL!,
    FRONTEND_URL = process.env.FRONTEND_URL!,
    JWT_SECRET = process.env.JWT_SECRET!,
    JWT_EXPIRY = process.env.JWT_EXPIRY!;
