import * as yup from "yup";
import { emailSchema, otpSchema, passwordSchema, phoneSchema, useridSchema } from "./common";
import { emailValidator, phoneValidator } from "../utils/validators";

// Signup schema
export const SignupSchema = yup.object({
    name: yup
        .string()
        .required("Please provide a name")
        .trim()
        .min(6, "Name must be at least 6 characters")
        .max(100, "Name must not exceed 100 characters"),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema
});
export type SignupSchemaType = yup.InferType<typeof SignupSchema>;

// Send otp schema
export const SendOtpSchema = yup.object({
    userid: useridSchema
});
export type SendOtpSchemaType = yup.InferType<typeof SendOtpSchema>;

// Verify otp schema
export const VerifyOtpSchema = yup.object({
    userid: useridSchema,
    otp: otpSchema
});
export type VerifyOtpSchemaType = yup.InferType<typeof VerifyOtpSchema>;

// Login Schema
export const LoginSchema = yup.object({
    identity: yup
        .string()
        .trim()
        .required("Please provide an email address or phone number")
        .test(
            "validate-email-phone",
            (value) => {
                if (value.includes("@")) {
                    return "Please provide a valid email address";
                }
                return "Please provide a valid phone number";
            },
            (value) => {
                if (value.includes("@")) {
                    return emailValidator(value);
                }
                return phoneValidator(value);
            }
        ),
    password: passwordSchema
});
export type LoginSchemaType = yup.InferType<typeof LoginSchema>;
