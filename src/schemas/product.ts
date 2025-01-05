import * as yup from "yup";
import { Types } from "mongoose";

// Product schema
export const ProductSchema = yup.object({
    name: yup
        .string()
        .required("Please provide a product name")
        .trim()
        .min(3, "Name must be of at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),
    description: yup
        .string()
        .required("Please provide a product description")
        .trim()
        .min(50, "Description must be at least 50 characters")
        .max(500, "Description must not exceed 500 characters"),
    price: yup
        .number()
        .required("Please provide a product price")
        .positive("Price must be greater than 0")
        .test("validate-price", "Please provide a valid price", (value) => value > 0),
    category: yup
        .string()
        .required("Please provide a product category")
        .trim()
        .min(3, "Category must be at least 3 characters")
        .max(100, "Category must not exceed 100 characters"),
    stock: yup
        .number()
        .required("Please provide the product stock")
        .integer("Stock must be a whole number")
        .min(0, "Stock cannot be negative")
        .test("validate-stock", "Please provide a valid stock", (value) => value >= 0),
    images: yup
        .array()
        .of(
            yup.object({
                public_id: yup.string().trim(),
                url: yup.string().trim()
            })
        )
        .default([])
});
export type ProductSchemaType = yup.InferType<typeof ProductSchema>;

// Product id schema
export const ProductIdSchema = yup.object({
    id: yup
        .string()
        .required("Please provide a product id")
        .trim()
        .test("validate-productid", "Please provide a valid product id", (value) => Types.ObjectId.isValid(value))
});
export type ProductIdSchemaType = yup.InferType<typeof ProductIdSchema>;
