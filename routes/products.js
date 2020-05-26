const express = require('express');
const router = express.Router();

let Product = require('../models/product');

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
                products: products
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
            res.status(200).render('products.pug',{
                products: products
            });
        }
    });
});

router.get('/add',(req,res)=>{
    // Add a product
    res.status(200).render('add-product.pug');
});

router.post('/add',(req,res)=>{
    // POST method to handle add request
    console.log("Request Body");
    console.log(req.body);
    let product = new Product();
    product.title = req.body.title;
    product.author = req.body.author;
    product.body = req.body.description;
    product.status = req.body.status;

    product.save((err,product)=>{
        if (err) {
            console.log("Error in adding new product");
            console.log(err);
            return;
        } else {
            res.redirect('/products');
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
                product: product
            });
        }
    });
});

router.post('/edit/:proId',(req,res)=>{
    // Post method to handle edit request
    console.log("Request Body");
    console.log(req.body);
    let product = {};
    product.title = req.body.title;
    product.author = req.body.author;
    product.body = req.body.description;
    product.status = req.body.status;

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