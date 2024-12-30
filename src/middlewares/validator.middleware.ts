import { AnyObject, ObjectSchema } from "yup";
import { TryCatchHandler } from "../utils/handlers";
import { RequestLocations } from "../types/types";

export const validatormiddleware = (location: RequestLocations, schema: ObjectSchema<AnyObject>) =>
    TryCatchHandler(async (req, res, next) => {
        // Get data from request location
        const data = req[location];

        // Validation of data
        const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true });

        // Add the validated data inside response locals
        res.locals[location] = validatedData;

        // Move to next handler function
        return next();
    });
