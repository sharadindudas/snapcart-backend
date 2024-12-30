import * as yup from "yup";
import { useridSchema } from "./common";

// Userid schema
export const UserIdSchema = yup.object({
    id: useridSchema
});
export type UserIdSchemaType = yup.InferType<typeof UserIdSchema>;
