import mongoose from "mongoose";
import { DATABASE_URL } from "../config/config.js";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: "mernEcommerce"
        });
        console.log(`MongoDB is connected successfully`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};
