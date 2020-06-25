const express = require('express');
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

router.get('/:category',(req,res)=>{
    Product.find({'category':req.params.category},function(err,products){
        if (err) {
            console.log("Error in displaying category");
            console.log(err);
            return;
        } else {

            if (categoryMap[req.params.category]==undefined) {
                // Category doesn't exsist
                res.status(200).render('category-fallback.pug',{
                    alertMessage: 'No such category found',
                    alertType: 'alert-danger',
                    alertShow: 'show',
                    session: {
                        isSignedIn: req.session.signedIn,
                        userName: req.session.userName,
                        userDP: req.session.userDP,
                        userId: req.session.userId,
                        cartSize: req.session.cartSize,
                        buyRequests: 0
                    }

                });
            } else {
                
                console.log("Products");
                console.log(products);

                let alertMessage='';
                let alertType='alert-danger';
                let alertShow='';
                let isEmpty=false;

                if (products.length==0) {
                    alertMessage='No Products Found';
                    alertShow='show';
                    isEmpty=true;
                }

                res.status(200).render('category-page.pug',{
                    categoryImage: '/static/images/category_page_'+req.params.category+'.jpg',
                    categoryImageSmall: '/static/images/category_page_small_'+req.params.category+'.jpg',
                    categoryName: categoryMap[req.params.category],
                    products: products,
                    alertMessage: alertMessage,
                    alertType: alertType,
                    alertShow: alertShow,
                    isEmpty: isEmpty,
                    session: {
                        isSignedIn: req.session.signedIn,
                        userName: req.session.userName,
                        userDP: req.session.userDP,
                        userId: req.session.userId,
                        cartSize: req.session.cartSize,
                        buyRequests: 0
                    }

                });
            }
            
        }
    });
});

module.exports = router;