import * as yup from "yup";
import mongoose from "mongoose";

const ProductIdSchema = yup.object({
    id: yup
        .string()
        .required("Please provide the product ID")
        .test("is-valid-id", "Please provide a valid product ID", (value) => mongoose.Types.ObjectId.isValid(value))
});
export type ProductIdSchema = yup.InferType<typeof ProductIdSchema>;
