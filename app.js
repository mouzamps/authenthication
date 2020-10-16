const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors =require('cors');

const app=express();

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})

























app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log('server listening on port ' + server.address().port);
});