import mongoose from "mongoose";
import { DATABASE_URL } from "../config/config";
import { logger } from "./logger";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: "snapcart"
        });
        logger.info(`MongoDB is connected successfully`);
    } catch (err: any) {
        logger.error(err.message);
        process.exit(1);
    }
};
