import * as yup from "yup";
import { emailSchema, passwordSchema } from "./common.validator";

// Register schema
export const RegisterSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Please provide the name")
        .min(6, "Name must be at least 6 characters")
        .max(50, "Name must not exceed 50 characters"),
    email: emailSchema,
    password: passwordSchema
});
export type RegisterSchema = yup.InferType<typeof RegisterSchema>;

// Login schema
export const LoginSchema = yup.object({
    email: emailSchema,
    password: passwordSchema
});
export type LoginSchema = yup.InferType<typeof LoginSchema>;
