let mongoose = require('mongoose');

// Product Schema 
let productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true 
    }, 
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
});

let Product = module.exports = mongoose.model('Product',productSchema);