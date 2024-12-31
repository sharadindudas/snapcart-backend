import { isValidPhoneNumber, parsePhoneNumberWithError } from "libphonenumber-js";
import validator from "validator";

// Phone parser
export const phoneparser = (phone: string) => {
    return parsePhoneNumberWithError(phone, { defaultCountry: "IN" });
};

// Phone validator
export const phonevalidator = (phone: string) => {
    const parsedPhoneNumber = phoneparser(phone).number;
    return isValidPhoneNumber(parsedPhoneNumber, { defaultCountry: "IN" });
};

// Email validator
export const emailvalidator = (email: string) => {
    return validator.isEmail(email);
};
