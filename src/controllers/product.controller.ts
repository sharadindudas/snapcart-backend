import { ProductModel } from "../models/product.model";
import { AsyncHandler, ErrorHandler } from "../utils/handlers";

// Create product (Admin)
export const createProduct = AsyncHandler(async (req, res, next) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Created product successfully",
            data: newProduct
        });
    } catch (err) {
        console.error(err);
    }
});

// Get all products
export const getAllProducts = AsyncHandler(async (req, res, next) => {
    const products = await ProductModel.find();
    res.status(200).json({
        success: true,
        message: "Fetched all products successfully",
        data: products
    });
});

// Update product (Admin)
export const updateProduct = AsyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    let product = await ProductModel.findById(productId);
    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    product = await ProductModel.findByIdAndUpdate({ _id: productId }, updatedProductData, {
        new: true
    });

    res.status(200).json({
        success: true,
        message: "Updated product successfully",
        data: product
    });
});

// Delete product (Admin)
export const deleteProduct = AsyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({
        success: true,
        message: "Deleted product successfully"
    });
});

// Get product details
export const getProductDetails = AsyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const product = await ProductModel.findById({ _id: productId });
    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Fetched product details successfully",
        data: product
    });
});
