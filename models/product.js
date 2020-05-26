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
    }
});

let Product = module.exports = mongoose.model('Product',productSchema);