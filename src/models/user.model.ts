import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: String,
        email: String,
        password: String
    },
    { timestamps: true, versionKey: false }
);

export const UserModel = model("User", userSchema);
