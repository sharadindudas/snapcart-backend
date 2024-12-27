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
        throw new ErrorHandler("Please provide all the fields", 400);
    }
    if (!images || images.length === 0) {
        throw new ErrorHandler("Product images are required", 400);
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

// Get all products
export const allproducts = TryCatchHandler(async (req, res, next) => {
    // Get all products
    const products = await ProductModel.find();

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Fetched all products successfully",
        data: products
    });
});

// Delete product
export const deleteproduct = TryCatchHandler(async (req, res, next) => {
    // Get the product id from request params
    const productid = req.params.id;

    // Check if the product exists in the db or not
    const productExists = await ProductModel.findById(productid);
    if (!productExists) {
        throw new ErrorHandler("Product does not exists", 404);
    }

    // Remove the product from db
    await productExists.deleteOne();

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Deleted product successfully"
    });
});
