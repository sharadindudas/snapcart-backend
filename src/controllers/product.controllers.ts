import { RequestHandler } from "express";
import { ProductModel } from "../models/products.model";

// Create a product
export const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Created a product successfully",
            data: newProduct
        });
    } catch (err) {
        console.error(err);
    }
};

// Get all products
export const getAllProducts: RequestHandler = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Fetched all products successfully"
    });
};
