const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const multer = require('multer');
const cors =require('cors');
const mongoose = require('mongoose');

const app=express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology:true});

const userSchema = {
    email: String,
    password: String
};
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
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else {
            res.render("secrets");
        }
    });
});
























app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log('server listening on port ' + server.address().port);
});