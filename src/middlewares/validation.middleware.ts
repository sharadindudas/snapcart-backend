import { AnyObject, ObjectSchema } from "yup";
import { AsyncHandler } from "../utils/handlers";

type RequestLocation = "body" | "query" | "params" | "headers" | "cookies";

export const validationMiddleware = (location: RequestLocation, schema: ObjectSchema<AnyObject>) =>
    AsyncHandler(async (req, res, next) => {
        // Get data from the request location
        const data = req[location];

        // Validation of data
        const validatedData = await schema.validate(data, { abortEarly: true, stripUnknown: true });

        // Set the validated data to response locals object
        res.locals = {...res.locals, ...validatedData};

        // Move to next handler function
        next();
    });
