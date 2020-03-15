const mongoose = require('mongoose');

const Public = mongoose.model('public',{
   message:{
       type:String
   }
})


module.exports = Public;