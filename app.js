//variable declaration
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
require('./db/mongoose');
const Student = require('./db/model/Student');
const Admin = require('./db/model/Admin');
const Public = require('./db/model/Public');
var info = null;


//Template Set
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'./public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Post Requests

//Login Request
app.post('/login',(req,res)=>{


    //Student Table Check
    Student.findOne({username:req.body.username},(error,result)=>{
        if(error){
            return res.send('Database Error!');
        }
        else if(result){
            if(result.password == req.body.password){
                info = result;
                return res.redirect('student');
            }
        }
    });


    //Admin Table check
    Admin.findOne({username:req.body.username},(error,result)=>{
        if(error){
            return res.send('Database Error!');
        }
        else if(result){
            if(result.password == req.body.password){
                info = result;
                return res.redirect('admin');
            }
        }
        res.send('Wrong username or Password');
    })
})

//Sign in Request
app.post("/sign_in",(req,res)=>{
    console.log(req.body)
    if(req.body.userType == 'Student'){
        const newStudent = new Student(req.body);
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

//Post Message
app.post('/message',(req,res)=>{
    console.log(req.body)
    for(i=0;i<req.body.studentList.length;i++){
        Student.findOneAndUpdate({username:req.body.studentList[i]},{$push:{message:req.body.message}},(error,result)=>{
            if(error){
                return console.log(error);
            }
            console.log(result)
        })
    }
    res.send('Updated!');
})

//POST public message


//GET Requests
app.get('/index',(req,res)=>{
    res.render("index");
})


app.get('/admin',(req,res)=>{
    res.render('admin');
})


app.get('/student',(req,res)=>{
    if(info){
        return res.render('student',info);
    }
    res.send('Acces denied!')
})


app.get('/student_details',(req,res)=>{
    Student.find({},(error,result)=>{
        if(error){
            console.log("error!");
            return res.send("Error in the database!");
        }
    res.send(result);
    });
})

app.get('/studentRecord',(req,res)=>{
    Student.findOne({username:req.query.username},(error,result)=>{
        if(error){
            console.log('Unable to find Student!');
            return res.send("Error in the database!");
        }
    res.send(result);
    })
})
app.get('/publicMessage',(req,res)=>{
    Public.find({},(error,result)=>{
        if(error){
            return res.send("Database Error!");
        }
        res.send(result);
    })
})

app.get('/logout',(req,res)=>{
    info = null;
    res.redirect('index')
})


//Hosted PORT
app.listen('3000',()=>{
    console.log('App is running on port:3000')
})