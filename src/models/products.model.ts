import { models } from "mongoose";
import { Document, Schema, model } from "mongoose";

interface Product extends Document {
    name: string;
    description: string;
    price: number;
    rating: number;
    images: {
        public_id: string;
        url: string;
    }[];
    category: string;
    stock: number;
    reviews: {
        name: string;
        rating: number;
        comment: string;
    }[];
}

const productSchema: Schema<Product> = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        rating: Number,
        images: [
            {
                public_id: String,
                url: String
            }
        ],
        category: String,
        stock: Number,
        reviews: [
            {
                name: String,
                rating: Number,
                comment: String
            }
        ]
    },
    { timestamps: true, versionKey: false }
);
export const ProductModel = models.Products || model<Product>("Product", productSchema);
