import * as yup from "yup";
import { emailvalidator, phonevalidator } from "../utils/validators";
import { Types } from "mongoose";

// Common schemas
export const emailSchema = yup
    .string()
    .required("Please provide an email address")
    .trim()
    .test("validate-email", "Please provide a valid email address", (value) => emailvalidator(value));

export const phoneSchema = yup
    .string()
    .required("Please provide a phone number")
    .trim()
    .test("validate-phone", "Please provide a valid phone number", (value) => phonevalidator(value));

export const passwordSchema = yup
    .string()
    .required("Please provide a password")
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gm,
        "Password must be atleast 8 characters, includes at least one uppercase letter, one lowercase letter, one number, and one special character"
    );

export const useridSchema = yup
    .string()
    .required("Please provide a user id")
    .trim()
    .test("validate-userid", "Please provide a valid user id", (value) => Types.ObjectId.isValid(value));

export const otpSchema = yup.string().required("Please provide an otp").trim().length(6, "Otp must be of 6 digits");

// User Id Schema
export const UserIdSchema = yup.object({
    id: useridSchema
});
export type UserIdSchemaType = yup.InferType<typeof UserIdSchema>;
