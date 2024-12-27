import { TryCatchHandler, ErrorHandler } from "../utils/handlers.js";
import { ProductModel } from "../models/product.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create product
export const createproduct = TryCatchHandler(async (req, res, next) => {
    // Get data from request body and files
    const { name, description, price, category, stock } = req.body;
    const images = req.files;

    // Validation of data
    if ([name, description, price, category, stock].some((field) => field.trim() === "")) {
        return next(new ErrorHandler("Please provide all the fields", 400));
    }
    if (!images || images.length === 0) {
        return next(new ErrorHandler("Product images are required", 400));
    }

    // Upload the product images to cloudinary
    const productImages = await Promise.all(
        images.map(async (image) => {
            const response = await uploadToCloudinary(image.path, "products");
            return response.secure_url;
        })
    );

    // Create new product
    const newProduct = await ProductModel.create({ ...req.body, images: productImages });

    // Return the response
    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
});
