const {taskModel} = require("../models")
const {userModel} = require("../models")



const getAuhtorTask = async (req, res) => {
    try {
        const task = await userModel.findAuthorTask(req.user._id) 
        res.status(200)
        res.send({data:task})
    } catch (err) {
        res.status(404)
        res.send({error: err})
    }  
}


const getOneTask = async (req, res) => {
    try {
        const task = await taskModel.findOneTask({taskID: req.params.id, userID: req.user._id })
        res.status(200)
        res.send({task})
    } catch (err) {
        res.status(404)
        res.send({error: "Task not found"})
    }  
}


const createTask = async (req, res) =>{
    const taskexist = await taskModel.checkDuplicate({taskTitle: req.body.title, userID: req.user._id })
   
   
    if(!taskexist.length == 0){

        res.status(400)
        res.send({error: "task already exist"})

    }else{
        try {
            const data = {...req.body, author: req.user._id}
            const newtask = await taskModel.create(data);
            await newtask.save()

            res.status(200)
            res.send({ message: "task created", task: newtask, user: req.user })
          
        } catch (err) {
            res.status(400)
            res.send({error: "can not create task", error: err.message})
        }
    }
 
}


//TODO ARREGLAR updatetask
const updatetask = async (req, res) => {
    const taskexist = await taskModel.findOneTask({taskID: req.params.id, userID: req.user._id })
   
    if(!taskexist){
        res.status(404)
        res.send({err: "The Task dont exist"})
    }else{
        try {
            await taskModel.updateOne({ _id: req.params.id}, {...req.body} );

            res.status(200);
            res.send({message: "task updated"})
          
        } catch (err) {
            res.status(400)
            res.send({err: "The Request is wrong", error: err.message})
        }
    }
}


const deletetask = async (req,res) => {
    const taskexist = await taskModel.findOneTask({taskID: req.params.id, userID: req.user._id })


    if(!taskexist){
        res.status(404)
        res.send({err: "The Task dont exist"})
    }else{
        try {
            const result = await taskModel.deleteOne({ _id: req.params.id});
            
            if(result.deletedCount == 0){
                res.status(404);
                res.send({message: "task already deleted"})
            }
            res.status(200);
            res.send({message: "task deleted"})
          
        } catch (err) {
            res.status(400)
            res.send({err: "The Request is wrong", error: err.message})
        }
    }


       
}


module.exports = {getOneTask, createTask, updatetask, deletetask, getAuhtorTask}