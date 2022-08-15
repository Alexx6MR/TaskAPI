const {taskModel} = require("../models")


const getAllTask = async (_, res) => {
    try {
        const tasks = await taskModel.find({})
        res.status(200)
        res.send({message: "tasks:", data: tasks})

    } catch (err) {
        res.status(403)
        res.send({message: "tasks not found "})
    }
    
}

const getOneTask = async (req, res) => {
    const _id = req.params.id
    try {
        const task = await taskModel.findById({_id}) 
        res.status(200)
        res.send({message: "task", data: task})    
    } catch (err) {
        res.send( {message: "task not found"})
    }
   
   

    
}

const createTask = async (req, res) =>{
    const task = req.body
    const taskexist = await taskModel.findOne({title: task.title})
    if(taskexist){
        res.status(403);
        res.send({message: "task already exist"})
    }else{
        try {
            const newtask = await taskModel.create(task);
            await newtask.save();
    
            res.status(200)
            res.send({ message: "task created", task: newtask })
          
        } catch (err) {
            res.status(400)
            res.send({ message: "error", ree: err})
        }
    }
    
    
}

//TODO ARREGLAR updatetask
const updatetask = async (req, res) => {
    const oldtask = await getOne(req.params.id);
    const newtask = oldtask.data
    try {
        await taskModel.deleteOne({ _id: newtask._id});
        return {message: "task updated", data: newtask}
    } catch (error) {
        return {message: "task dont exist"}
    }
}


const deletetask = async (req,res) => {
    const oldtask = await getOne(req.params.id);
    const _id = oldtask.data._id
    
    try {
        await taskModel.deleteOne({ _id});

        res.status(200);
        res.send({message: "task deleted", data: task})
    } catch (error) {
        res.status(403);
        res.send({message: "task already deleted"})
    }
}


module.exports = {getAllTask, getOneTask, createTask, updatetask, deletetask}