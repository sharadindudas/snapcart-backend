import "dotenv-flow/config";

export const ENV = process.env.ENV!,
    PORT = process.env.PORT!,
    FRONTEND_URL = process.env.FRONTEND_URL!,
    SERVER_URL = process.env.SERVER_URL!,
    DATABASE_URL = process.env.DATABASE_URL!,
    CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!,
    RESEND_API_KEY = process.env.RESEND_API_KEY!,
    FROM_EMAIL = process.env.FROM_EMAIL!,
    REDIS_HOST = process.env.REDIS_HOST!,
    REDIS_PORT = parseInt(process.env.REDIS_PORT!),
    REDIS_PASSWORD = process.env.REDIS_PASSWORD!,
    JWT_SECRET = process.env.JWT_SECRET!;
