const mongoose = require('mongoose');

const User = mongoose.model('users',{
    username:{
        type:String
    },
    password:{
        type:String
    }
})


module.exports = User;