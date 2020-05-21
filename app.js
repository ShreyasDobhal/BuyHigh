const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan')
const app = express();

const port = 4000;
const dbName = 'test'

// MONGOOSE
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});
var Contact = mongoose.model('Contact', contactSchema);


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


// END POINTS
app.get('/',(req,res)=>{
    // Simple text on webpage
    res.send('Server is running . . . ');
});

app.get('/home',(req,res)=>{
    // Sending parameters and rendering a webpage
    const params = {
        title:'BuyHigh',
        content: 'Server Running'
    };
    res.status(200).render('home.pug',params);
});

app.get('/json',(req,res)=>{
    // Sending a JSON response
    res.status(200).json({
        message: 'It works'
    });
});

app.get('/products/:proId',(req,res)=>{
    // Receiving query
    res.status(200).json({
        id: req.params.proId,
        message: 'GET method works'
    });
});

app.post('/products',(req,res)=>{
    // Receiving a payload
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: 'Product added',
        product: product
    })
});

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