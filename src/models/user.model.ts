import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "user" | "admin";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: String,
        email: String,
        phone: String,
        password: String,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Hash the password
userSchema.pre("save", async function (next) {
    // If the password is unchanged
    if (!this.isModified("password")) {
        return next();
    }

    // If the password is modified
    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

// Compare the password
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password as string);
};

export const UserModel = model<IUser>("User", userSchema);
