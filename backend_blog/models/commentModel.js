
    const mongoose = require("mongoose");


    //rout handler 
    const  commentSchema = new mongoose.Schema({
        post :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post", // this is a reference to the post model
        },
        user : {
            type : String,
            required : true
        },
        body: {
            type : String,
            required : true
        }
    })

    module.exports = mongoose.model("Comment",commentSchema);