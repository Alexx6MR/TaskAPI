const {userModel} = require("../models")



const getAll = async (req, res) => {
    try {
        const users = await userModel.findAuthorTask(req.user._id)
        res.status(200)
        res.send({message: "Users:", data: users})

    } catch (err) {
        res.status(404)
        res.send({message: "Users not found"})
        
    }
    
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id) 
        res.status(200)
        res.send({data:user})
    } catch (err) {
        res.status(404)
        res.send({error: "user not found"})
    }  
}


const updateUser = async (req, res) => {
    const taskexist = await userModel.findById(req.params.id)
   
    if(!taskexist){
        res.status(404)
        res.send({err: "The User dont exist"})
    }else{
        try {
            await userModel.updateOne({ _id: req.params.id}, {...req.body} );

            res.status(200);
            res.send({message: "user updated", taskexist})
          
        } catch (err) {
            res.status(400)
            res.send({err: "The Request is wrong", error: err.message})
        }
    }
}


const deleteUser = async (req,res) => {
    const taskexist = await userModel.findById(req.params.id)
   
    if(!taskexist){
        res.status(404)
        res.send({err: "The User dont exist"})
    }else{
        try {
            await userModel.deleteOne({ _id: req.params.id});

            res.status(200);
            res.send({message: "user deleted", taskexist})
          
        } catch (err) {
            res.status(400)
            res.send({err: "The Request is wrong", error: err.message})
        }
    }
}


module.exports = {getAll, getUser, updateUser, deleteUser}