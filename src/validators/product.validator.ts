import * as yup from "yup";
import mongoose from "mongoose";

// Upsert product schema
export const UpsertProductSchema = yup.object({
    _id: yup.string().trim().optional(),
    name: yup
        .string()
        .trim()
        .min(1, "Product name must be at least one character")
        .max(100, "Product name must not exceed 100 characters")
        .required("Please provide the product name"),
    description: yup
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(2000, "Description must not exceed 2000 characters")
        .required("Please provide the description"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be greater than 0")
        .max(99999999, "Price cannot exceed 99,999,999")
        .required("Please provide the price"),
    images: yup
        .array()
        .of(
            yup.object({
                public_id: yup.string().trim().required("Please provide the public_id for the image"),
                url: yup.string().trim().url("Image URL must be a valid URL").required("Please provide the image URL")
            })
        )
        .min(1, "At least one product image is required")
        .max(10, "Cannot upload more than 10 images")
        .required("Please provide product images"),
    category: yup
        .string()
        .trim()
        .min(1, "Category must be at least one character")
        .max(50, "Category must not exceed 50 characters")
        .required("Please provide the category"),
    stock: yup
        .number()
        .typeError("Stock must be a number")
        .integer("Stock must be an integer")
        .min(0, "Stock cannot be negative")
        .max(9999, "Stock cannot exceed 9999")
        .required("Please provide the stock")
});
export type UpsertProductSchema = yup.InferType<typeof UpsertProductSchema>;

// Get all products schema
export const GetAllProductsSchema = yup
    .object({
        page: yup.number().integer("Page must be an integer").min(1, "Page must be at least 1").default(1),
        limit: yup.number().integer("Limit must be an integer").min(1, "Limit must be at least 1").max(100, "Limit must not exceed 100").default(15),
        order: yup.string().optional().trim().oneOf(["asc", "desc"], "Order must be 'asc' or 'desc'").default("desc"),
        search: yup.string().optional().trim(),
        category: yup.string().optional().trim(),
        minPrice: yup.number().min(0, "Minimum price must be at least 0").optional(),
        maxPrice: yup.number().min(0, "Maximum price must be at least 0").optional()
    })
    .test("price-range", "Maximum price must be greater than or equal to minimum price", function (value) {
        if (!value.minPrice || !value.maxPrice) return true;
        return value.maxPrice >= value.minPrice;
    });

export type GetAllProductsSchema = yup.InferType<typeof GetAllProductsSchema>;

// Product id schema
export const ProductIdSchema = yup.object({
    id: yup
        .string()
        .required("Please provide the product ID")
        .test("is-valid-id", "Please provide a valid product ID", (value) => mongoose.Types.ObjectId.isValid(value))
});
export type ProductIdSchema = yup.InferType<typeof ProductIdSchema>;
