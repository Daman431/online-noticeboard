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
var studentInfo = null;
var adminInfo = null;


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
                studentInfo = result;
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
                adminInfo = result;
                return res.redirect('admin');
            }
        }
        res.send("<h1>Wrong Password!</h1>")
    });

})

//Sign in Request
app.post("/sign_in",(req,res)=>{

    if(req.body.userType == 'Student'){
        Student.findOne({username:req.body.username},(error,result)=>{
            if(result){
                return res.send('Already Exist!');
            }
            const newStudent = new Student(req.body);
            studentInfo = req.body;
            newStudent.save().then(()=>{
                res.redirect("student");
            })
        })
        
    }
    else if(req.body.userType == 'Admin'){
        Admin.findOne({},(error,result)=>{
            if(result){
                return res.send('Already Exist!');
            }
            const newAdmin = new Admin(req.body);
            adminInfo = req.body;
            newAdmin.save().then(()=>{
                res.redirect('admin');
            })
        })
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
app.post('/publicMessage',(req,res)=>{
    console.log(req.body)
    const newPublicMessage = new Public(req.body);
    newPublicMessage.save().then(()=>{
        res.send("Saved successfully!");
    });
})

//GET Requests
app.get('/index',(req,res)=>{
    res.render("index");
})


//Render Admin Page
app.get('/admin',(req,res)=>{
    if(adminInfo){
        return res.render('admin',adminInfo);
    }
    res.send('Acces denied!')
})

//Render Student Page
app.get('/student',(req,res)=>{
    if(studentInfo){
        return res.render('student',studentInfo);
    }
    res.send('Acces denied!')
})

//Send Student List
app.get('/studentList',(req,res)=>{
    Student.find({},(error,result)=>{
        if(error){
            return res.send("Error in the database!");
        }
    res.send(result);
    });
})

//Send Student Details
app.get('/studentRecord',(req,res)=>{
    Student.findOne({username:req.query.username},(error,result)=>{
        if(error){
            return res.send("Error in the database!");
        }
    res.send(result);
    })
})

//Display Public Message
app.get('/publicMessage',(req,res)=>{
    Public.find({},(error,result)=>{
        if(error){
            return res.send("Database Error!");
        }
        res.send(result);
    })
})

//Logout
app.get('/logout',(req,res)=>{
    studentInfo = null;
    adminInfo = null;
    res.redirect('index')
})


//Hosted PORT
app.listen('3000',()=>{
    console.log('App is running on port:3000')
})