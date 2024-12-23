import { ProductModel } from "../models/product.js";
import { ErrorHandler, TryCatchHandler } from "../utils/handlers.js";

// Create product
export const createproduct = TryCatchHandler(async (req, res, next) => {
    // Create new product
    const newProduct = await ProductModel.create(req.body);

    // Return the response
    return res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: newProduct
    });
});

// Get all products
export const allproducts = TryCatchHandler(async (req, res, next) => {
    // Get all the products
    const products = await ProductModel.find();

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Fetched all products successfully",
        data: products
    });
});

// Update product
export const updateproduct = TryCatchHandler(async (req, res, next) => {
    // Check if the product exists in the db or not
    const productId = req.params.id;
    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
        return next(new ErrorHandler("Product does not exists", 404));
    }

    // Update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Updated product successfully",
        data: updatedProduct
    });
});

// Delete product
export const deleteproduct = TryCatchHandler(async (req, res, next) => {
    // Check if the product exists in the db or not
    const productId = req.params.id;
    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
        return next(new ErrorHandler("Product does not exists", 404));
    }

    // Delete the product
    await ProductModel.findByIdAndDelete(productId);

    // Return the response
    return res.status(200).json({
        success: true,
        message: "Deleted product successfully"
    });
});
