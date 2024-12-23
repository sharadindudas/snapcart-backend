import "dotenv-flow/config";

export const ENV = process.env.ENV,
    PORT = parseInt(process.env.PORT),
    FRONTEND_URL = process.env.FRONTEND_URL,
    SERVER_URL = process.env.SERVER_URL,
    DATABASE_URL = process.env.DATABASE_URL,
    REDIS_HOST = process.env.REDIS_HOST,
    REDIS_PASSWORD = process.env.REDIS_PASSWORD,
    REDIS_PORT = parseInt(process.env.REDIS_PORT),
    RESEND_API_KEY = process.env.RESEND_API_KEY,
    FROM_EMAIL = process.env.FROM_EMAIL,
    ADMIN_EMAIL = process.env.ADMIN_EMAIL,
    JWT_SECRET = process.env.JWT_SECRET;
