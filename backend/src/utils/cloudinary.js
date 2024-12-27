import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/config.js";
import fs from "fs";

// Connection to cloudinary
export const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });
};

// Upload resource to cloudinary
export const uploadToCloudinary = async (localFilePath, folderName) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto", folder: folderName });

        fs.unlink(localFilePath, (err) => {
            if (err) throw err.message;
        });
        return response;
    } catch (err) {
        fs.unlink(localFilePath, (err) => {
            if (err) throw err.message;
        });
        return null;
    }
};
