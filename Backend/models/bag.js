const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        trim: true
    },
    category: {
        type: String
    },
    imageUrl: {
        type: String,
        default: ""
    },
    stock:{
        type: Number,
        required: true,
        min: 0,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cloudinary_id: { type: String }
});

module.exports = mongoose.model("Bag", bagSchema);