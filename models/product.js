let mongoose = require('mongoose');

// Product Schema 
let productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    thumbnail: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    tags: [
        mongoose.Schema.Types.String
    ],
    category: {
        type: String,
        required: true
    },
    rating: {
        value: Number,
        val5: Number,
        val4: Number,
        val3: Number,
        val2: Number,
        val1: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    reviews: [
        {
            userName: String,
            userDP: Number,
            rating: Number,
            comment: String
        }
    ]
});

let Product = module.exports = mongoose.model('Product',productSchema);