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
            res.status(200).render('products.pug',{
                products: products,
                alertMessage: req.query.alertMessage,
                alertType: req.query.alertType,
                alertShow: req.query.alertShow
            });
        }
    });
});

router.get('/view/:proId',(req,res)=>{
    // View product with given id
    Product.findById(req.params.proId,function(err,product){
        if (err) {
            console.log("Error in searching");
            return;
        } else {
            console.log(product);
            let products = [product]
            if (product==null) {
                // No Product found
                // TODO provide better fallback
                res.status(200).send('Product Not Found');
            } else {
                res.status(200).render('products.pug',{
                    products: products
                });
            }
            
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
            let alertMessage = '';
            let alertType = '';
            let alertShow = '';

            if (products.length==0) {
                alertMessage = 'No product matched your search';
                alertType = 'alert-danger';
                alertShow = 'show';
            }
            res.status(200).render('products.pug',{
                products: products,
                alertMessage: alertMessage,
                alertType: alertType,
                alertShow: alertShow
            });
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