const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const app = express();

const port = 4000;
const dbName = 'buyhigh';

// const dataJSON = JSON.parse(fs.readFileSync('routes.json'));
// console.log(dataJSON);

let Product = require('./models/product');

// MONGOOSE
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    // Connected
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


// // Express Session
// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true,
//     // cookie: {secure:true}
// }));

// // Express Messages
// app.use(require('connect-flash')());
// app.use(function(req,res,next){
//     res.locals.messages = require('express-messages')(req,res);
//     next();
// });


// ROUTES 
// /articles
let articles = require('./routes/articles.js');
app.use('/articles',articles);
// /products
let products = require('./routes/products.js');
app.use('/products',products);


// END POINTS

app.get('/',(req,res)=>{
    res.send('Server is running . . . ');
});

app.get('/home',(req,res)=>{
    // Sending parameters and rendering a webpage
    const params = {
        title:'BuyHigh'
    };
    res.status(200).render('home.pug',params);
});

app.get('/json',(req,res)=>{
    // Sending a JSON response
    res.status(200).json({
        message: 'It works'
    });
});

// app.get('/products/:proId',(req,res)=>{
//     // Receiving query
//     Product.findById(req.params.proId,function(err,product){
//         if (err) {
//             console.log("Error in searching");
//             return;
//         } else {
//             console.log(product);
//             let products = [product]
//             res.status(200).render('products.pug',{
//                 products: products
//             });
//         }
//     });
// });

// app.get('/products/edit/:proId',(req,res)=>{
//     // Receiving query
//     Product.findById(req.params.proId,function(err,product){
//         if (err) {
//             console.log("Error in searching");
//             return;
//         } else {
//             console.log(product);
//             // let products = [product]
//             res.status(200).render('edit-product.pug',{
//                 product: product
//             });
//         }
//     });
// });

// app.post('/edit/product/:proId',(req,res)=>{
//     // console.log(req);
//     console.log("Request Body");
//     console.log(req.body);
//     let product = {};
//     // product._id = req.params._id;
//     product.title = req.body.title;
//     product.author = req.body.author;
//     product.body = req.body.description;
//     product.status = req.body.status;

//     Product.updateOne({'_id':req.params.proId},product,(err,product)=>{
//         if (err) {
//             console.log("Error in updating");
//             console.log(err);
//             return;
//         } else {
//             res.redirect('/products');
//         }
//     });
//     // res.status(200).send('Product added successfully');
// });

// app.delete('/delete/product/:proId',(req,res)=>{
//     // console.log(req);
//     console.log("Request Body");
//     console.log(req.body);
//     // let product = {};
//     // product._id = req.params._id;
//     // product.title = req.body.title;
//     // product.author = req.body.author;
//     // product.body = req.body.description;
//     // product.status = req.body.status;

//     Product.remove({'_id':req.params.proId},(err,product)=>{
//         if (err) {
//             console.log("Error in deleting");
//             console.log(err);
//             return;
//         } else {
//             res.redirect('/products');
//         }
//     });
//     // res.status(200).send('Product added successfully');
// });


// app.get('/products',(req,res)=>{
//     console.log("Products searched");
//     Product.find({}, function(err,products){
//         if (err) {
//             console.log("Error");
//             console.log(err);
//             res.send("Error");
//         } else {
//             console.log("Products are :");
//             console.log(products);
//             res.status(200).render('products.pug',{
//                 products: products
//             });
//         }
//     });
// });

// app.get('/addproduct',(req,res)=>{
//     res.status(200).render('add-product.pug');
// });

// app.post('/addproduct',(req,res)=>{
//     req.checkBody('title','Title is required').notEmpty();
    
//     let errors = req.validationErrors();

//     if (errors) {
//         console.log("Error found");
//         res.render('add-product.pug');
//     } else {
//         console.log("Worked fine");
//     }
//     // console.log(req);
//     console.log("Request Body");
//     console.log(req.body);
//     let product = new Product();
//     product.title = req.body.title;
//     product.author = req.body.author;
//     product.body = req.body.description;
//     product.status = req.body.status;

//     product.save((err,product)=>{
//         if (err) {
//             console.log("Error in saving");
//             console.log(err);
//             return;
//         } else {
//             res.redirect('/products');
//         }
//     });
//     // res.status(200).send('Product added successfully');
// });



// app.post('/products',(req,res)=>{
//     // Receiving a payload
//     const product = {
//         name: req.body.name,
//         price: req.body.price
//     };
//     res.status(200).json({
//         message: 'Product added',
//         product: product
//     })
// });

app.post('/save',(req,res)=>{
    // Saving data to MongoDB
    let data = new Contact(req.body);
    data.save().then(()=>{
        res.status(200).send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
});


// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});


// Use in JQuery 

// $(document).ready(function(){
//     $('.deleteBtn').on('click',function(e){
//         $target = $(e.$target);
//         console.log($target.attr('data-id'));
//         $.ajax({
//             type:'DELETE',
//             url:'/delete/product/'+IDBCursor,
//             success: function(res) {
//                 window.location.href='/';
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });
//     });
// });