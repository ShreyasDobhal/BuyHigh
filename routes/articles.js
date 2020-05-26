const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

router.get('/info',(req,res)=>{
    bcrypt.genSalt(10,function(err,salt) {
        bcrypt.hash('Hello',salt,function(err,hash){
            if (err) {
                console.log("Failed to hash");
                res.send("Failed to generate hash");
            } else {
                console.log("Hashed");
                console.log(hash);
                res.send(hash);
            }
        });
    });
    
});

module.exports = router;