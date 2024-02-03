const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"],
            trim: true,
            maxlen: [20, "Name must be within 20 characters"],
        },
        price: {
            type: Number,
            required: [true, "Please provide price"],
            default: 0,
        },
        description: {
            type: String,
            required: [true, "Please provide your name"],
            trim: true,
            maxlen: [200, "Name must be within 20 characters"],
        },
        image: {
            type: String,
            required: true,
            default: "./image/default-pic.jpg",
        },
        category: {
            type: String,
            enum: {
                values: [],
                message: "{VALUE} is not supported",
            },
            required: [true, "please mention the category"],
        },
        company: {
            type: String,
        },
        colors: {
            type: [],
        },
        featured: {
            type: Boolean,
        },
        freeShipping: {
            type: Boolean,
        },
        inventory: {
            type: Number,
        },
        averageRating: {
            type: Number,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(productSchema, "Product");
