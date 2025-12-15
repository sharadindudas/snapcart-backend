import bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";
import { UserRole } from "../types";

interface IUser extends Document {
    name: string;
    authProviders: {
        local?: {
            email: string;
            password: string;
        };
        google?: {
            googleId: string;
        };
    };
    phone?: string;
    avatar?: {
        public_id: string;
        url: string;
    };

    role: UserRole;
    isVerified: boolean;
    isActive: boolean;

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
        authProviders: {
            local: {
                email: {
                    type: String,
                    lowercase: true,
                    trim: true
                },
                password: {
                    type: String,
                    select: false
                }
            },
            google: {
                googleId: String
            }
        },
        phone: {
            type: String,
            trim: true
        },
        avatar: {
            public_id: String,
            url: String
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
        lastLogin: Date
    },
    { timestamps: true, versionKey: false }
);

userSchema.index({ "authProviders.local.email": 1 }, { unique: true, sparse: true });

// Hash password
userSchema.pre("save", async function () {
    if (this.isModified("authProviders.local.password")) {
        const localAuth = this.authProviders?.local;
        if (localAuth?.password) {
            localAuth.password = await bcrypt.hash(localAuth.password, 10);
        }
    }
});

// Compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.authProviders?.local?.password);
};

export const UserModel = model("User", userSchema);
