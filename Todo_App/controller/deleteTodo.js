
const Todo = require("../models/Todo");

exports.deleteTodo = async(req,res) => {
    try {

        const {id} = req.params;
        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Deleted successfully"
        })

    } catch (error) {

        res.status(500).json({
            success : false,
            message : "Unsuccessfull",
            error : error.message
        })
    }   
}
