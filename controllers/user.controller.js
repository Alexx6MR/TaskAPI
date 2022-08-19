const {userModel} = require("../models")




const getAll = async (_, res) => {
    try {
        const users = await userModel.find({})
        res.status(200)
        res.send({message: "Users:", data: users})

    } catch (err) {
        res.status(404)
        res.send({message: "Users not found"})
        
    }
    
}

const getOne = async (req, res) => {
    try {
        const task = await taskModel.findById({_id: req.params.id}) 
        res.status(200)
        res.send({data:task})
    } catch (err) {
        res.status(404)
        res.send({error: "user not found"})
    }  
}

//TODO ARREGLAR updateUser
const updateUser = async (req, res) => {
    try {
        const data = await userModel.findByIdAndUpdate(req.body._id, req.body)
        res.status(200)
        res.send({msg: "user updated", data: data })
    } catch (err) {
        res.status(400)
        res.send({msg: "user dont work" })
    }
}


const deleteUser = async (req,res) => {
    try {
        await userModel.deleteOne({ _id: req.params.id});
        res.status(200);
        res.send({message: "User deleted"})
    } catch (error) {
        handleHttpError(
            {
                res:res, 
                message: "User already deleted", 
                code: 404   
            })
    }
}


module.exports = {getAll, getOne, updateUser, deleteUser}