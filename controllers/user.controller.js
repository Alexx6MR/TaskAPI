const {userModel} = require("../models")

const getAll = async (_, res) => {
    try {
        const users = await userModel.find({})
        res.status(200)
        res.send({message: "Users:", data: users})

    } catch (err) {
        res.status(403)
        res.send({message: "Users not found "})
    }
    
}

const getOne = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await userModel.findById({_id}) 
        res.status(200)
        res.send({message: "User", data: user})    
    } catch (err) {
        res.send( {message: "User not found"})
    }
   
   

    
}

const createUser = async (req, res) =>{
    const user = req.body
    const userexist = await userModel.findOne({email: user.email})
    if(userexist){
        res.status(403);
        res.send({message: "User already exist"})
    }else{
        try {
     
            const newuser = await userModel.create(user);
            await newuser.save();
    
            res.status(200)
            res.send({ message: "User created", user: newuser })
          
        } catch (err) {
            res.status(400)
            res.send({ message: "error", ree: err})
        }
    }
    
    
}

//TODO ARREGLAR updateUser
const updateUser = async (req, res) => {
    const olduser = await getOne(req.params.id);
    const newuser = olduser.data
    try {
        await userModel.deleteOne({ _id: newuser._id});
        return {message: "User updated", data: newuser}
    } catch (error) {
        return {message: "User dont exist"}
    }
}


const deleteUser = async (req,res) => {
    const olduser = await getOne(req.params.id);
    const _id = olduser.data._id
    
    try {
        await userModel.deleteOne({ _id});

        res.status(200);
        res.send({message: "User deleted", data: user})
    } catch (error) {
        res.status(403);
        res.send({message: "User already deleted"})
    }
}


module.exports = {getAll, getOne, createUser, updateUser, deleteUser}