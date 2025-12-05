import mongoose from "mongoose";
import { DATABASE_URL } from "../config";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL, { dbName: "snapcart" });
        console.log("MongoDB is connected successfully");
    } catch (err) {
        console.error("Failed to connect to mongodb", err);
        process.exit(1);
    }
};
