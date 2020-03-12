const mongoose = require('mongoose');

const Public = mongoose.model('public',{
   message:{
       type:Array
   }
})


module.exports = Public;