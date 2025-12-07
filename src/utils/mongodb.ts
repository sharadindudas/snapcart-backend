import mongoose from "mongoose";
import { DATABASE_URL } from "../config";

export const connectMongoDB = async () => {
    await mongoose.connect(DATABASE_URL, { dbName: "snapcart" });
    console.log("MongoDB is connected successfully");
};
