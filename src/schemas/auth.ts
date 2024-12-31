import * as yup from "yup";
import { emailSchema, otpSchema, passwordSchema, phoneSchema, useridSchema } from "./common";
import { emailvalidator, phonevalidator } from "../utils/validators";

// Signup schema
export const SignupSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Please provide a name")
        .min(6, "Name must be at least 6 characters")
        .max(100, "Name must not exceed 100 characters"),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema
});
export type SignupSchemaType = yup.InferType<typeof SignupSchema>;

// Send Otp schema
export const SendOtpSchema = yup.object({
    userid: useridSchema
});
export type SendOtpSchemaType = yup.InferType<typeof SendOtpSchema>;

// Verify Otp schema
export const VerifyOtpSchema = yup.object({
    userid: useridSchema,
    otp: otpSchema
});
export type VerifyOtpSchemaType = yup.InferType<typeof VerifyOtpSchema>;

// Login schema
export const LoginSchema = yup.object({
    identity: yup
        .string()
        .trim()
        .required("Please provide an email or phone")
        .test(
            "validate-email-phone",
            (value: string) => {
                if (value.includes("@")) {
                    return "Please provide a valid email address";
                } else {
                    return "Please provide a valid phone number";
                }
            },
            (value: string) => {
                if (value.includes("@")) {
                    return emailvalidator(value);
                } else {
                    return phonevalidator(value);
                }
            }
        ),
    password: passwordSchema
});
export type LoginSchemaType = yup.InferType<typeof LoginSchema>;

// Token schema
export const TokenSchema = yup.object({
    snapcartToken: yup.string().trim().required("Please Login to continue")
});
export type TokenSchemaType = yup.InferType<typeof TokenSchema>;
