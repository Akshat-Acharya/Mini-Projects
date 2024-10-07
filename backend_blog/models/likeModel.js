

const mongoose = require("mongoose");


//rout handler 
    const likeSchema = new mongoose.Schema({
        post:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        },
        user:{
            type : String,
            required : true,
        }
    })

    module.exports = mongoose.model("Like",likeSchema);