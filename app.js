const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/donateinfo', {useNewUrlParser: true, useUnifiedTopology: true})
const bodyparser=require('body-parser');
const port=80;

//Define mongoose schema
const donateSchema = new mongoose.Schema({
    name: String,
    tranid: String,
    email: String,
    amt: String 
  });
var Donate= mongoose.model('Donate', donateSchema);

//For serving static files
app.use('/static' ,express.static('static'));
app.use(express.urlencoded());

//Set the template engine as pug
app.set('view engine','pug');

//Set the views directory
app.set('views',path.join(__dirname,'views'));
//PATHS SERVED
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
})
app.get('/about',(req,res)=>{
    const params={ }
    res.status(200).render('about.pug',params);
})
app.get('/donate',(req,res)=>{
    const params={ }
    res.status(200).render('donate.pug',params);
})
app.post('/donate',(req,res)=>{
    var myData=new Donate(req.body);
    myData.save().then(()=>{
        res.status(200).render('thankyou.pug');
    }).catch(()=>{
        res.status(400).send("ITEM NOT SAVED!");
    });
    // res.status(200).render('contact.pug');
})


//Start of server
app.listen(port,()=>{
    console.log(`The application started on port ${port}`);
});