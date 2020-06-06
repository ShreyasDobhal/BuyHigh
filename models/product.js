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

// db.products.updateOne({'_id':ObjectId('5eca97660e46221ae33a4dcf')},{$set:{reviews:[{userName:'user01',userDP:1,rating:4,comment:'This product is amazing, can be used by anyone. Easy to learn and get used to it. Makes life very easy'},{userName:'user02',userDP:2,rating:5,comment:'Just loved it. Can be used by kids as well as old people.'}]}})
// db.products.updateOne({'_id':ObjectId('5eca97660e46221ae33a4dcf')},{$pull:{reviews:{'0':{userName:'user03'}}}})
// db.products.updateOne({'_id':ObjectId('5eca97660e46221ae33a4dcf')},{$push:{reviews:{userName:'user03',userDP:3,rating:5,comment:'No words can describe how brilliant it is'}}})
// db.products.updateOne({'_id':ObjectId('5eca97660e46221ae33a4dcf')},{$set:{rating:{value:4.6,val5:2,val4:1,val3:0,val2:0,val1:0}}})