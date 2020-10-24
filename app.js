require('dotenv').config();  //envirionment viriable for hiding secret keys while publishing to github etc
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const multer = require('multer');
const cors =require('cors');
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');





const app=express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    
}))

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology:true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});



const User = new mongoose.model("User",userSchema);


app.get("/",function(req,res){
    res.render("home")
});
app.get("/login",function(req,res){
    res.render("login")
});
app.get("/register",function(req,res){
    res.render("register")
});
app.post("/register",function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save(function(err){
            if(err){
                console.log(err);
            }else {
                res.render("secrets");
            }
        });
    });
    
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err,foundUser){
        if(err){
            console.log(err);
        }else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if (result == true) {
                        res.render("secrets");
                    }
                });
     
                
            }
        }
    });
});























app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log('server listening on port ' + server.address().port);
});