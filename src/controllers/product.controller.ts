import { ProductModel } from "../models/product.model";
import { AsyncHandler, ErrorHandler } from "../utils/handlers";
import { GetAllProductsSchema, ProductIdSchema, UpsertProductSchema } from "../validators/product.validator";

// Upsert product (Admin)
export const upsertProduct = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { _id: productId, ...validatedData } = res.locals as UpsertProductSchema;
    let product;

    // If the product id is present then update the product data
    if (productId) {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            {
                _id: productId
            },
            validatedData,
            {
                new: true,
                runValidators: true
            }
        );
        product = updatedProduct;
    }
    // If the product id is not present then create the product
    else {
        const newProduct = await ProductModel.create(validatedData);
        product = newProduct;
    }

    // Return the response
    res.status(productId ? 200 : 201).json({
        success: true,
        message: productId ? "Updated product successfully" : "Created product successfully",
        data: product
    });
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

// Delete product (Admin)
export const deleteProduct = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { id: productId } = res.locals as ProductIdSchema;

    // Check if the product exists or not
    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    // Find the product and remove it
    await ProductModel.findByIdAndDelete({ _id: productId });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Deleted product successfully"
    });
});

// Get product details
export const getProductDetails = AsyncHandler(async (_req, res, _next) => {
    // Get data from response locals
    const { id: productId } = res.locals as ProductIdSchema;

    // Check if the product exists or not
    const product = await ProductModel.findById({ _id: productId });
    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched product details successfully",
        data: product
    });
});
