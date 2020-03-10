const mongoose = require('mongoose');

const Admin = mongoose.model('admin',{
    username:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = Admin