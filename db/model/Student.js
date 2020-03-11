const mongoose = require('mongoose');

const Student = mongoose.model('students',{
    username:{
        type:String
    },
    password:{
        type:String
    },
    roll_no:{
        type:String
    },
    message:{
        type:Array
    }
})

module.exports = Student;