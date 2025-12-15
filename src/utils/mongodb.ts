import mongoose from "mongoose";
import { DATABASE_URL } from "../config";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL, { dbName: "snapcart" });
        console.log("✅ MongoDB is connected successfully");
    } catch (err) {
        if (err instanceof Error) {
            console.error("❌ Mongodb connection error:", err.message);
        }
        process.exit(1);
    }
};
