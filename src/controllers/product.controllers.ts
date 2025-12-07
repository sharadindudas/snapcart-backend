import { RequestHandler } from "express";
import { ProductModel } from "../models/products.model";

// Create product (Admin)
export const createProduct: RequestHandler = async (req, res) => {
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
};

// Get all products
export const getAllProducts: RequestHandler = async (req, res) => {
    const products = await ProductModel.find();
    res.status(200).json({
        success: true,
        message: "Fetched all products successfully",
        data: products
    });
};

// Update product (Admin)
export const updateProduct: RequestHandler = async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    let product = await ProductModel.findById(productId);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
        return;
    }

    product = await ProductModel.findByIdAndUpdate({ _id: productId }, updatedProductData, {
        new: true
    });

    res.status(200).json({
        success: true,
        message: "Updated product successfully",
        data: product
    });
};

// Delete product (Admin)
export const deleteProduct: RequestHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
        return;
    }

    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({
        success: true,
        message: "Deleted product successfully"
    });
};

// Product details
export const getProductDetails: RequestHandler = async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Fetched product details successfully",
        data: product
    });
};
