let mongoose = require('mongoose');

// Order Schema 
let orderSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productThumbnail: {
        type: String
    },
    sellerId: {
        type: String
    },
    sellerName: {
        type: String
    },
    buyerId: {
        type: String,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
    date: {
        type: Date
    }
});

let Order = module.exports = mongoose.model('Order',orderSchema);