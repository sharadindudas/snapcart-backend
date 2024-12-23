import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter product Name"],
            trim: true
        },
        desc: {
            type: String,
            required: [true, "Please Enter product Description"]
        },
        price: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"]
        },
        ratings: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
        numOfReviews: {
            type: Number,
            default: 0
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String,
            required: [true, "Please Enter Product Category"]
        },
        inStock: {
            type: Number,
            required: [true, "Please Enter product Stock"],
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1
        }
    },
    { timestamps: true }
);

export const ProductModel = model("Product", productSchema);
