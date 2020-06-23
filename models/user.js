let mongoose = require('mongoose');

// User Schema 
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userDP: {
        type: String
    },
    address: [
        {
            addressName: String,
            addressLine1: String,
            addressLine2: String,
            landmark: String,
            city: String,
            state: String,
            country: String,
            zincode: Number
        }
    ],
    cart: [
        {
            productId: String,
            productName: String,
            sellerId: String,
            sellerName: String,
            price: Number,
            rating: Number,
            productThumbnail: String
        }
    ]

});

let User = module.exports = mongoose.model('User',userSchema);