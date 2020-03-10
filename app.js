//variable declaration
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
require('./db/mongoose');
const Student = require('./db/model/Student');
const Admin = require('./db/model/Admin');


//template set
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'./public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/index',(req,res)=>{
    res.render("index");
})

app.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(error,result)=>{
        if(result.password == req.body.password){
            console.log(result)
            res.send("FOUND!")
        }
        else{
            res.send("Wrong pass!")
        }
    })
})


app.post("/sign_in",(req,res)=>{

    if(req.body.userType == 'Student'){
        const newStudent = new Student(req.body)
        newStudent.save().then(()=>{
            res.redirect("student");
        });
    }
    else if(req.body.userType == 'Admin'){
        const newAdmin = new Admin(req.body);
        newAdmin.save().then(()=>{
            res.redirect('admin');
        });
    }
})

app.get('/admin',(req,res)=>{
    res.render('admin');
})
app.listen('3000',()=>{
    console.log('App is running on port:3000')
})