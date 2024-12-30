import { isValidPhoneNumber, parsePhoneNumberWithError } from "libphonenumber-js";
import validator from "validator";

// Phone parser
export const phoneParser = (phone: string) => {
    return parsePhoneNumberWithError(phone, { defaultCountry: "IN" });
};

// Phone validator
export const phoneValidator = (phone: string) => {
    const parsedPhoneNumber = phoneParser(phone).number;
    return isValidPhoneNumber(parsedPhoneNumber, { defaultCountry: "IN" });
};

// Email validator
export const emailValidator = (email: string) => {
    return validator.isEmail(email);
};
