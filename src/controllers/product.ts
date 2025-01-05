import { Response } from "express";
import { ProductIdSchemaType, ProductSchemaType } from "../schemas/product";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { ErrorHandler, TryCatchHandler } from "../utils/handlers";
import { ApiResponse } from "../@types/express";
import { ProductModel } from "../models/product";

// Get all products
export const getallproducts = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get all the products
    const products = await ProductModel.find().lean();

    // Total no of products
    const totalProducts = await ProductModel.countDocuments();

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all products successfully",
        data: {
            total: totalProducts,
            products
        }
    });
});

// Get product details
export const getproductdetails = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get product id from response locals
    const { id } = res.locals.params as ProductIdSchemaType;

    // Check if the product exists in the db or not
    const productExists = await ProductModel.findById(id);
    if (!productExists) {
        throw new ErrorHandler("Product does not exists", 404);
    }

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched product details successfully",
        data: productExists
    });
});

// Create product (admin)
export const createproduct = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get data from response locals
    const productData = res.locals.body as ProductSchemaType;
    const imageFiles = req.files as Express.Multer.File[];

    // Validation of images
    if (!imageFiles || imageFiles.length === 0) {
        throw new ErrorHandler("Please provide product image", 400);
    }

    // Upload the images to cloudinary
    const uploadPromises = imageFiles.map((file) => uploadToCloudinary(file.path, "products"));
    const uploadedImages = await Promise.all(uploadPromises);
    productData.images = uploadedImages;

    // Create a new product
    const newproduct = await ProductModel.create(productData);

    // Return the response
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newproduct
    });
});

// Delete product (admin)
export const deleteproduct = TryCatchHandler(async (req, res: Response<ApiResponse>, next) => {
    // Get product id from response locals
    const { id } = res.locals.params as ProductIdSchemaType;

    // Check if the product exists in the db or not
    const productExists = await ProductModel.findById(id);
    if (!productExists) {
        throw new ErrorHandler("Product does not exists", 404);
    }

    // Delete product images from cloudinary
    const deletePromises = productExists.images.map((image) => deleteFromCloudinary(image.public_id));
    await Promise.all(deletePromises);

    // Delete the product from db
    await productExists.deleteOne();

    // Return the response
    res.status(200).json({
        success: true,
        message: "Deleted product successfully"
    });
});
