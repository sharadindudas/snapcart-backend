import { Document, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../types";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: {
        public_id: string;
        url: string;
    };

    role: UserRole;
    isVerified: boolean;
    isActive: boolean;

    wishlist: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;

    comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            select: false
        },
        phone: {
            type: String,
            trim: true
        },
        avatar: {
            public_id: String,
            url: String,
            _id: false
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CUSTOMER,
            index: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        lastLogin: Date
    },
    { timestamps: true, versionKey: false }
);

// Hash password
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password as string, 12);
    }
});

// Compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = model("User", userSchema);
