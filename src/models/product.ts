import { Document, model, Schema } from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: [
        {
            public_id: string;
            url: string;
        }
    ];
    ratings: number;
    reviews: [
        {
            name: string;
            comment: string;
            rating: number;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        stock: {
            type: Number,
            default: 1
        },
        category: String,
        images: [
            {
                public_id: String,
                url: String,
                _id: false
            }
        ],
        ratings: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: String,
                comment: String,
                rating: Number
            }
        ]
    },
    { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", productSchema);
