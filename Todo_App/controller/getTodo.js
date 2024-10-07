const Todo = require("../models/Todo");

exports.getTodo = async(req,res) => {
    try {

            //fetching 
            const todos = await Todo.find({});

            //response
            res.status(200).json({
                success : true,
                data : todos,
                message : "Entire data is fetchhed "
            })
       
        }

     catch (error) {

            console.error(error);
            res.status(500).json({
                success : false,
                data : "internal server failed",    
                message : error.message,

            })

    }   
}

exports.getTodoById = async(req,res) => {

    try {

        //extract on basis of id
        const id = req.params.id;
        const todo = await Todo.findById({_id:id});
        //data not found 
        if(!todo){
            return res.status(404).json({
                success : false,
                message : "no data found",

            })
        }
        // if data found
        return res.status(200).json({
            success : true,
            data : todo,
            message : `Todo ${id} data successfully fetched`,
        })
    }

 catch (error) {
    console.error(error);
            res.status(500).json({
                success : false,
                data : "internal server failed",    
                message : error.message,

            })
       
}   

}
