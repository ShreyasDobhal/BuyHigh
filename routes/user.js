const express = require('express');
const multer = require('multer');
const path = require('path');
const url = require('url');
const router = express.Router();

let User = require('../models/user');
let Product = require('../models/product');

router.get('/json',(req,res)=>{
    User.find({},function(err,users) {
        console.log(users);
        res.json(users);
    });
});

router.get('/signup',(req,res)=>{
    res.status(200).render("signup.pug",{
        session: {
            isSignedIn: req.session.signedIn,
            userName: req.session.userName,
            userDP: req.session.userDP,
            userId: req.session.userId,
            cartSize: 0,
            buyRequests: 0
        }
    });
    
});

router.post('/signup',(req,res)=>{
    console.log(req.body);
    
    let username = req.body.name;
    let email = req.body.email;
    let pwd1 = req.body.password1;
    let pwd2 = req.body.password2;

    let message = '';

    if (username=='' || email=='' || pwd1=='')
        message = 'Fields cannot be empty !';
    else if (pwd1!=pwd2) 
        message = "Passwords don't match";

    if (message=='') {

        let user = new User();
        user.name = username;
        user.email = email;
        user.password = pwd1;
        user.userDP = Math.floor(Math.random()*5)+1;

        user.save((err,user)=>{
            if (err) {
                console.log("Error in creating account");
                console.log(err);
                return;
            } else {
                console.log(user._id);

                req.session.userId = user._id;
                req.session.userName = user.name;
                req.session.userDP = user.userDP;
                req.session.signedIn = true;

                res.redirect('/home');
            }
        });
    } else {
        res.status(200).render('signup.pug',{
            alertMessage: message,
            alertType: 'alert-danger',
            alertShow: 'show'
        });    
    }
});

router.post('/signin',(req,res)=>{
    
    User.find({email:req.body.email, password:req.body.password},function(err,users){
        if (err) {
            console.log("Error in finding user");
            console.log(err);
            res.status(401).send('Invalid credentials');
        } else {
            console.log('Users : ');
            console.log(users);

            if (users.length!=0) {
                let currentUser = users[0];
                req.session.signedIn = true;
                req.session.userName = currentUser.name;
                req.session.userDP = currentUser.userDP;
                req.session.userId = currentUser._id;
                res.status(200).send('Signed in successfully');
            } else {
                console.log("No such user found");
                res.status(401).send('Invalid credentials');
            }
        }
    });
});

router.post('/logout',(req,res)=>{
    req.session.signedIn = false;
    req.session.userId = undefined;
    res.status(200).send('Logged out successfully');
});

// TODO
router.get('/products/:userId',(req,res)=>{
    // View products of particular user

    Product.find({'sellerId':req.params.userId}, function(err,products){
        if (err) {
            console.log("Error in displaying all products");
            console.log(err);
            res.send("Error");
        } else {
            console.log("Products are :");
            console.log(products);

            let isOwnPage;
            let isEmpty;

            if (req.params.userId == req.session.userId) {
                // Viewing own products
                isOwnPage = true;
            } else {
                // Viewind else's products
                isOwnPage = false;
            }

            if (products.length==0) {
                isEmpty = true;
            } else {
                isEmpty = false;
            }

            console.log('isOwnPage',isOwnPage);

            res.status(200).render('user-products.pug',{
                products: products,
                isOwnPage: isOwnPage,
                isEmpty: isEmpty,
                session: {
                    isSignedIn: req.session.signedIn,
                    userName: req.session.userName,
                    userDP: req.session.userDP,
                    userId: req.session.userId,
                    cartSize: 0,
                    buyRequests: 0
                }
            });

            
        }
    });
});


router.get('/cart',(req,res)=>{

    if (req.session.signedIn) {

        User.find({_id:req.session.userId},function(err,users){
            if (!users || users.length==0) {
                res.status(500).send('Error in finding user information');
            } else {
                let currentUser = users[0];
                let isCartEmpty = false;
                let cart = currentUser.cart;
                console.log(cart);
                if (!currentUser.cart || currentUser.cart.length==0)
                isCartEmpty=true;
                console.log(isCartEmpty);
                res.status(200).render('cart.pug',{
                    session: {
                        isSignedIn: req.session.signedIn,
                        isCartEmpty: isCartEmpty,
                        userName: req.session.userName,
                        userDP: req.session.userDP,
                        userId: req.session.userId,
                        user: users[0],
                        cart: cart,
                        cartSize: 0,
                        buyRequests: 0
                    }
                });
            }
        });

        
    } else {
        res.status(200).render('signin-fallback.pug',{
            session: {
                isSignedIn: req.session.signedIn,
                userName: req.session.userName,
                userDP: req.session.userDP,
                userId: req.session.userId,
                cartSize: 0,
                buyRequests: 0
            }
        });
    }
});

router.post('/addcart',(req,res)=>{
    // Add product to cart
    console.log(req.body);

    let cartItem = {
        productId: req.body.productId,
        productName: req.body.productName,
        productThumbnail: req.body.productThumbnail,
        sellerId: req.body.sellerId,
        sellerName: req.body.sellerName,
        price: req.body.price
    }

    if (req.session.signedIn) {
        User.updateOne({_id:req.session.userId},{$push :{cart:cartItem}},function(err,user){
            if (err) {
                console.log("Error in adding product to cart");
                console.log(err);
                res.status(500).send("Failed to add product to element");
            } else {
                res.status(200).send("Product Successfully added to cart");
            }
        });
    } else {
        res.status(401).send("Not signed in");
    }
});

router.delete('/product',(req,res)=>{
    // db.users.updateOne({_id:ObjectId('5eda90edcd98411df525d4e1')},{$pull : {'cart': {_id:ObjectId('5ee3915409304314adc77d5c')}}})

    User.updateOne({_id:req.session.userId},{$pull: {cart:{productId:req.body.productId}} },function(err,user) {
        if (err) {
            console.log('Error in deleting product');
            console.log(err);
            res.status(500).send('Failed to removed product from cart');
        } else {
            res.status(200).send('Product Removed from cart successfully');
        }
    });
})



module.exports = router;