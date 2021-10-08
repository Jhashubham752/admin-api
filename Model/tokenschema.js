 const mongoose = require('mongoose');
 let { ObjectId } = require("mongoose");
 const token = new Schema({

    userId:{
        type= ObjectId,
        required= true,
        ref:"user"
    } ,

    token:{
        type:String,
        required: true
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 3600,
    }
 });
module.exports = mongoose.model("token", token);
