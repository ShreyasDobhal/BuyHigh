const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const url = require('url');
const app = express();

const port = 4000;
const dbName = 'buyhigh';

let Product = require('./models/product');

// MONGOOSE
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    // Connected
    console.log("MongoDB running");
    console.log("We are connected !");
});

// MORGAN
app.use(morgan('dev'));


// BODY-PARSER
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


// EXPRESS
app.use('/static',express.static('static'));
app.use(express.urlencoded())


// PUG
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


// Express Session
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));

// Session Variables
// signedIn
// userName
// userDP
// userId
// cartSize
// buyRequests


// ROUTES 
// /products
let products = require('./routes/products.js');
app.use('/products',products);
// /category
let category = require('./routes/category.js');
app.use('/category',category);
// /user
let user = require('./routes/user.js');
app.use('/user',user);


// END POINTS

app.get('/',(req,res)=>{
    res.send('Server is running . . . ');
});

app.get('/home',(req,res)=>{
    res.status(200).render('home.pug',{
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

// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});

