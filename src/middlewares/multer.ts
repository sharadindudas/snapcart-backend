import multer from "multer";
import { Request } from "express";

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and WebP images are allowed"), false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});
