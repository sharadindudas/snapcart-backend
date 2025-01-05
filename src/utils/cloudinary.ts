import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/config";
import fs from "fs/promises";
import { ErrorHandler } from "./handlers";

// Connect to cloudinary
export const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });
};

// Upload to cloudinary
export const uploadToCloudinary = async (localFilePath: string, Folder: string) => {
    try {
        // Upload the image/images
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: Folder,
            resource_type: "auto"
        });

        // Delete the local file
        await fs.unlink(localFilePath);

        // Return the cloudinary details
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (err) {
        await fs.unlink(localFilePath);
        throw new ErrorHandler("Error uploading image to cloudinary", 400);
    }
};

// Delete from cloudinary
export const deleteFromCloudinary = async (public_id: string) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        if (result.result !== "ok") {
            throw new ErrorHandler("Failed to delete image from cloudinary", 500);
        }
        return result;
    } catch (err) {
        throw new ErrorHandler("Error deleting image from Cloudinary", 500);
    }
};
