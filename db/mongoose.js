const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/noticeboard_db",{useCreateIndex:true,useNewUrlParser:true});