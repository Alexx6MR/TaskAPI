const {taskModel} = require("../models")


const getAllTask = async (req, res) => {
    try {
        const tasks = await taskModel.findAllData({})
        res.status(200)
        res.send({message: "tasks:", data: tasks})

    } catch (err) {
        res.status(403)
        res.send({message: "tasks not found ", err: err.message})
    }
    
}

const getOneTask = async (req, res) => {
    try {
        const task = await taskModel.findOneData(req.params.id) 
        res.status(200)
        res.send({data:task})
    } catch (err) {
        res.status(404)
        res.send({error: "Task not found"})
    }  
}


const createTask = async (req, res) =>{
    const taskexist = await taskModel.findOne({title: req.body.title})
    if(taskexist){

        res.status(400)
        res.send({error: "task already exist"})

    }else{
        try {
            const newtask = await taskModel.create(req.body);
            await newtask.save();
    
            res.status(200)
            res.send({ message: "task created", task: newtask })
          
        } catch (err) {
            res.status(400)
            res.send({error: "can not create task", error: err.message})
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
    try {
        const task = await taskModel.findById({_id: req.params.id})
     
        if(task){
            await taskModel.delete({ _id: req.params.id});
            res.status(200);
            res.send({message: "task deleted"})
        }else{
            res.status(404)
            res.send({error: "task already deleted"})
        }
        
    } catch (error) {
        res.status(400)
        res.send({error: "The Request is wrong"})
    }
       
}


module.exports = {getAllTask, getOneTask, createTask, updatetask, deletetask}