import * as yup from "yup";
import mongoose from "mongoose";

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

const ProductIdSchema = yup.object({
    id: yup
        .string()
        .required("Please provide the product ID")
        .test("is-valid-id", "Please provide a valid product ID", (value) => mongoose.Types.ObjectId.isValid(value))
});
export type ProductIdSchema = yup.InferType<typeof ProductIdSchema>;
