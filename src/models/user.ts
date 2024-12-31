import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    isVerified: boolean;
    role: "user" | "admin";
    comparePassword: (password: string) => Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: String,
        email: String,
        phone: String,
        password: String,
        isVerified: {
            type: Boolean,
            default: false
        },
        role: {
            type: "String",
            enum: ["user", "admin"],
            default: "user"
        }
    },
    { timestamps: true }
);

// Hash the password
userSchema.pre("save", async function (next) {
    // If the password is unchanged
    if (!this.isModified("password")) next();

    // If the password has changed
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare the password
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
