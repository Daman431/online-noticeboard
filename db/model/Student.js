const mongoose = require('mongoose');

const Student = mongoose.model('students',{
    username:{
        type:String
    },
    password:{
        type:String
    },
    roll:{
        type:String
    },
    message:{
        type:String
    }
})

module.exports = Student;