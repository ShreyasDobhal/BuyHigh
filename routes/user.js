const express = require('express');
const multer = require('multer');
const path = require('path');
const url = require('url');
const router = express.Router();

let User = require('../models/user');

router.get('/json',(req,res)=>{
    User.find({},function(err,users) {
        console.log(users);
        res.json(users);
    });
});

router.get('/signup',(req,res)=>{
    res.status(200).render("signup.pug");
    
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
            return;
        } else {
            console.log('Users : ');
            console.log(users);

            if (users.length!=0) {
                let currentUser = users[0];
                req.session.signedIn = true;
                req.session.userName = currentUser.name;
                req.session.userDP = currentUser.userDP;
                req.session.userId = currentUser._id;
                res.redirect('/home');
            } else {
                console.log("No such user found");
                return;
            }
        }
    });
});

router.get('/logout',(req,res)=>{
    req.session.signedIn = false;
    res.redirect('/home');
});


module.exports = router;