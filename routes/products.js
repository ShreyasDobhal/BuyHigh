const express = require('express');
const multer = require('multer');
const path = require('path');
const url = require('url');
const router = express.Router();

let Product = require('../models/product');

let categoryMap = {
    'book':'Books & Stationary',
    'beauty':'Beauty Products',
    'clothing':'Clothing',
    'computer':'Mobile & Computer',
    'garden':'Garden & Outdoors',
    'furniture':'Furniture',
    'kitchen':'Home & Kitchen',
    'shoes':'Shoes & Handbags',
    'toys':'Toys',
    'watch':'Watches & Wallets',
    'other':'Other'
};

var Storage = multer.diskStorage({
    destination: './static/uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage
}).single('thumbnail');

router.get('/demo',(req,res)=>{
    Product.find({},function(err,products) {
        console.log(products);
        res.json(products);
    });
});

router.get('/',(req,res)=>{
    // View all the products
    console.log("Products searched");
    Product.find({}, function(err,products){
        if (err) {
            console.log("Error in displaying all products");
            console.log(err);
            res.send("Error");
        } else {
            console.log("Products are :");
            console.log(products);
            if (products.length==0) {
                // Empty product list
                res.status(200).render('products.pug',{
                    products: products,
                    alertMessage: '0 products found',
                    alertType: 'alert-danger',
                    alertShow: 'show',
                    isEmpty: true
                });
            } else {
                res.status(200).render('products.pug',{
                    products: products,
                    alertMessage: req.query.alertMessage,
                    alertType: req.query.alertType,
                    alertShow: req.query.alertShow
                });
            }
            
        }
    });
});

router.get('/view/:proId',(req,res)=>{
    // View product with given id
    Product.findById(req.params.proId,function(err,product){
        if (err || product==null) {
            console.log("Error in searching");
            // console.log(err);
            res.status(200).render('product-page.pug',{
                product: {},
                alertMessage: 'No such product found',
                alertType: 'alert-danger',
                alertShow: 'show',
                isEmpty: true
            });
        } else {
            console.log(product);
            let totalRatings=0;
            let ratePercentage=[0,0,0,0,0];
            for (let i=0;i<5;i++) {
                totalRatings += product.rating['val'+(i+1)];
            }
            if (totalRatings!=0) {
                for (let i=0;i<5;i++) {
                    ratePercentage[i] = 'width: '+(product.rating['val'+(i+1)]/totalRatings*100)+'%;';
                }
            }
            // console.log(ratePercentage);
            isCommentEmpty=false;
            if (product.reviews==undefined || product.reviews.length==0) {
                isCommentEmpty=true;
            }
            
            res.status(200).render('product-page.pug',{
                product: product,
                rating5Cnt: ratePercentage[4],
                rating4Cnt: ratePercentage[3],
                rating3Cnt: ratePercentage[2],
                rating2Cnt: ratePercentage[1],
                rating1Cnt: ratePercentage[0],
                isCommentEmpty: isCommentEmpty
            });
        }
    });
});


router.get('/search/:tag',(req,res)=>{
    // View all the products
    var tag = new RegExp(["^", req.params.tag, "$"].join(""), "i");
    Product.find({tags:tag}, function(err,products){
        if (err) {
            console.log("Error in displaying all products");
            console.log(err);
            res.send("Error");
        } else {
            console.log("Products are :");
            console.log(products);

            if (products.length==0) {
                // No products found
                res.status(200).render('products.pug',{
                    products: products,
                    alertMessage: 'No product matched your search',
                    alertType: 'alert-danger',
                    alertShow: 'show',
                    isEmpty: true
                });
            } else {
                res.status(200).render('products.pug',{
                    products:products
                })
            }
            
        }
    });
});

router.get('/add',(req,res)=>{
    // Add a product
    res.status(200).render('add-product.pug');
});


router.post('/add',upload,(req,res)=>{
    // POST method to handle add request
    console.log(req.file.filename+' added successfully');

    console.log("Request Body");
    console.log(req.body);
    console.log("File received");
    console.log(req.file);

    let tags = req.body.tags.split(',');
    for (let i=0;i<tags.length;i++)
        tags[i]=tags[i].trim();

    let product = new Product();
    product.title = req.body.title;
    product.seller = req.body.seller;
    product.body = req.body.description;
    product.price = req.body.price;
    product.status = req.body.status;
    product.thumbnail = req.file.filename;
    product.date = new Date();
    product.tags = tags;
    product.category = req.body.category;
    product.quantity = req.body.quantity;

    product.save((err,product)=>{
        if (err) {
            console.log("Error in adding new product");
            console.log(err);
            return;
        } else {
            let string = encodeURIComponent('product was addedd successfully and routed');
            res.redirect(url.format({
                pathname:"/products",
                query: {
                   'alertMessage': 'Product added successfully',
                   'alertType': 'alert-success',
                   'alertShow':'show'
                 }
              }));
        }
    });
});

router.post('/addreview',(req,res)=>{
    console.log('Request Body');
    console.log(req.body);
    // console.log(req.body.proId);

    let review = {
        userName: req.body.userName,
        userDP: req.body.userDP,
        rating: req.body.rating,
        comment: req.body.review
    };

    Product.findOneAndUpdate({'_id':req.body.proId},{ $push :{reviews:review} },(err,product)=>{
        if (err) {
            console.log("Error in adding review");
            console.log(err);
            return;
        } else {
            console.log("Review added successfully");
            return;
        }
    });
});

router.post('/addrating',(req,res)=>{
    console.log('Request Body');
    console.log(req.body);

    Product.find({'_id':req.body.proId},function(err,products){
        if (err) {
            console.log("Failed to find product");
            console.log(err);
            return;
        } else {
            for (let i=0;i<products.length;i++) {
                let product = products[i];
                let ratings = [0,0,0,0,0];
                let denominator = 0;
                let numerator = 0;
                for (let j=0;j<5;j++) {
                    ratings[j] = product.rating['val'+(j+1)];
                    denominator += ratings[j];
                    numerator += ratings[j]*(j+1);
                    // console.log(ratings[j]+'*'+(j+1)+'='+(ratings[j]*(j+1))+' => '+numerator);
                }
                ratings[req.body.rating-1]++;
                denominator++;
                numerator+=parseInt(req.body.rating);
                console.log("Numerator",numerator);
                console.log("Denominator",denominator);
                
                let rating = {
                    value: (numerator/denominator).toFixed(1),
                    val5: ratings[4],
                    val4: ratings[3],
                    val3: ratings[2],
                    val2: ratings[1],
                    val1: ratings[0]
                };

                console.log("Rating");
                console.log(rating);

                Product.updateOne({'_id':req.body.proId},{rating:rating},function(err,doc){
                    if (err) {
                        console.log('Error in Updating the rating');
                        console.log(err);
                        return;
                    } else {
                        console.log('Rating updated successfully');
                        return;
                    }
                })
            }
        }
    });
});

router.get('/edit/:proId',(req,res)=>{
    // Edit product with given id
    Product.findById(req.params.proId,function(err,product){
        if (err) {
            console.log("Error in searching");
            return;
        } else {
            console.log(product);
            // let products = [product]
            res.status(200).render('edit-product.pug',{
                product: product,
                categoryName: categoryMap[product.category]
            });
        }
    });
});

router.post('/edit/:proId',(req,res)=>{
    // Post method to handle edit request
    console.log("Request Body");
    console.log(req.body);

    let tags = req.body.tags.split(',');
    for (let i=0;i<tags.length;i++)
        tags[i]=tags[i].trim();

    let product = {};
    product.title = req.body.title;
    product.seller = req.body.seller;
    product.body = req.body.description;
    product.price = req.body.price;
    product.status = req.body.status;
    product.tags = tags;
    product.category = req.body.category;
    product.quantity = req.body.quantity;

    Product.updateOne({'_id':req.params.proId},product,(err,product)=>{
        if (err) {
            console.log("Error in updating");
            console.log(err);
            return;
        } else {
            res.redirect('/products');
        }
    });
});

router.delete('/delete/:proId',(req,res)=>{
    // DELETE method to handle delete request
    console.log("Request Body");
    console.log(req.body);

    Product.remove({'_id':req.params.proId},(err,product)=>{
        if (err) {
            console.log("Error in deleting");
            console.log(err);
            return;
        } else {
            res.redirect('/products');
        }
    });
});







module.exports = router;