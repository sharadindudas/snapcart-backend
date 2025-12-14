import * as yup from "yup";

export const emailSchema = yup.string().required("Please provide an email").email("Please provide a valid email address").lowercase().trim();

export const passwordSchema = yup
    .string()
    .required("Please provide the password")
    .min(8, "Password must be at least 8 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        "Password must contain uppercase, lowercase, number and special character"
    );
