import { Schema, model } from "mongoose";

// Product schema
const productSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        category: String,
        images: [String],
        stock: {
            type: Number,
            default: 1
        },
        ratings: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                rating: Number,
                comment: String
            }
        ]
    },
    { timestamps: true }
);

// Product model
export const ProductModel = model("Product", productSchema);
