const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"],
            trim: true,
            maxlen: [],
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
        },
        image: {
            type: String,
        },
        category: {
            type: String,
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
