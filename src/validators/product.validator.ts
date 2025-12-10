import * as yup from "yup";
import mongoose from "mongoose";

// Get all products schema
export const GetAllProductsSchema = yup
    .object({
        page: yup
            .number()
            .transform((_value, original) => {
                if (original === "" || original === undefined || original === null) return undefined;
                return Number(original);
            })
            .integer("Page must be an integer")
            .min(1, "Page must be at least 1")
            .default(1),

        limit: yup
            .number()
            .transform((_value, original) => {
                if (original === "" || original === undefined || original === null) return undefined;
                return Number(original);
            })
            .integer("Limit must be an integer")
            .min(1, "Limit must be at least 1")
            .max(100, "Limit must not exceed more than 100")
            .default(15),

        order: yup
            .string()
            .transform((value) => (value === undefined || value === null ? undefined : String(value).trim().toLowerCase()))
            .oneOf(["asc", "desc"], "Order must be ascending or descending")
            .default("desc"),

        search: yup
            .string()
            .transform((v) => (v === undefined || v === null ? "" : String(v).trim()))
            .default(""),

        category: yup
            .string()
            .transform((v) => (v === undefined || v === null ? "" : String(v).trim()))
            .default(""),

        minPrice: yup
            .number()
            .transform((_value, original) => {
                if (original === "" || original === undefined || original === null) return undefined;
                return Number(original);
            })
            .min(0, "Minimum price must be at least 0")
            .default(0),

        maxPrice: yup
            .number()
            .transform((_value, original) => {
                if (original === "" || original === undefined || original === null) return undefined;
                return Number(original);
            })
            .min(0, "Maximum price must be at least 0")
            .default(Infinity)
    })
    .test("price-range", "Maximum price must be greater than equal to minimum price", (obj) => {
        if (!obj) return true;
        if (obj.maxPrice === undefined || obj.maxPrice === null) return true;
        const min = obj.minPrice ?? 0;
        return obj.maxPrice >= min;
    });
export type GetAllProductsSchema = yup.InferType<typeof GetAllProductsSchema>;

const ProductIdSchema = yup.object({
    id: yup
        .string()
        .required("Please provide the product ID")
        .test("is-valid-id", "Please provide a valid product ID", (value) => mongoose.Types.ObjectId.isValid(value))
});
export type ProductIdSchema = yup.InferType<typeof ProductIdSchema>;
