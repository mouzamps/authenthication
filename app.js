const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const multer = require('multer');
const cors =require('cors');

const app=express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){
    res.render("home")
});
app.get("/login",function(req,res){
    res.render("login")
});
app.get("/register",function(req,res){
    res.render("register")
});

























app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log('server listening on port ' + server.address().port);
});