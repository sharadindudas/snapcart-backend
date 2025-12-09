import { ProductModel } from "../models/product.model";
import { AsyncHandler, ErrorHandler } from "../utils/handlers";
import { GetAllProductsSchema } from "../validators/product.validator";

// Create product (Admin)
export const createProduct = AsyncHandler(async (req, res, _next) => {
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
export const getAllProducts = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { page, limit, order, search, category, minPrice, maxPrice } = res.locals as GetAllProductsSchema;
    const skip = (page - 1) * limit;

    // Build the filter logic
    const filter: any = {};

    // Adding the filters if they are present
    if (search) {
        filter.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    }
    if (category) {
        filter.category = { $regex: category, $options: "i" };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    // Get all the products with filtering, sorting and pagination
    const allProducts = await ProductModel.find(filter)
        .limit(limit + 1)
        .skip(skip)
        .sort({ createdAt: order === "desc" ? -1 : 1 })
        .lean();

    // If number of products are more than the limit then remove the last product
    const hasMore = allProducts.length > limit;
    if (hasMore) {
        allProducts.pop();
    }

    // Calculate the next and previous page
    const nextPage = hasMore ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all products successfully",
        data: {
            allProducts,
            nextPage,
            prevPage
        }
    });
});

// Update product (Admin)
export const updateProduct = AsyncHandler(async (req, res, _next) => {
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
export const deleteProduct = AsyncHandler(async (req, res, _next) => {
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
export const getProductDetails = AsyncHandler(async (req, res, _next) => {
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
