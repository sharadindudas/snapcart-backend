import { Document, model, Schema, Types } from "mongoose";
import { ProductStatus } from "../types";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: Array<{
        public_id: string;
        url: string;
    }>;
    category: string;
    stock: number;
    reviews: {
        name: string;
        rating: number;
        comment: string;
    }[];
    seller: Types.ObjectId;
    status: ProductStatus;
    approvedByAdmin: boolean;
}

const productSchema: Schema<IProduct> = new Schema(
    {
        name: {
            type: String,
            index: true
        },
        description: String,
        price: Number,
        ratings: Number,
        images: [
            {
                public_id: String,
                url: String,
                _id: false
            }
        ],
        category: {
            type: String,
            index: true
        },
        stock: Number,
        reviews: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                name: String,
                rating: Number,
                comment: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        seller: {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true
        },
        status: {
            type: String,
            enum: Object.values(ProductStatus),
            default: ProductStatus.DRAFT
        },
        approvedByAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, versionKey: false }
);
export const ProductModel = model<IProduct>("Product", productSchema);
