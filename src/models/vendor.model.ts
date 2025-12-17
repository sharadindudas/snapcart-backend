import { Document, model, Schema, Types } from "mongoose";

export interface IVendor extends Document {
    user: Types.ObjectId;
    storeName: string;
    description?: string;
    logo?: {
        public_id: string;
        url: string;
    };
    isApproved: boolean;
    isSuspended: boolean;
    commissionRate: number;
    createdAt: Date;
    updatedAt: Date;
}

const vendorSchema = new Schema<IVendor>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },
        storeName: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        logo: {
            public_id: String,
            url: String
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        isSuspended: {
            type: Boolean,
            default: false
        },
        commissionRate: {
            type: Number,
            default: 10
        }
    },
    { timestamps: true, versionKey: false }
);

export const VendorModel = model<IVendor>("Vendor", vendorSchema);
