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

const createUser = async (req, res) =>{
    const user = req.body
    const userexist = await userModel.findOne({email: user.email})
    if(userexist){
        res.status(400);
        res.send({message: "User already exist"})
    }else{
        try {
     
            const newuser = await userModel.create(user);
            await newuser.save();
    
            res.status(201)
            res.send({ message: "User created", user: newuser })
          
        } catch (err) {
            handleHttpError(
                {
                    res:res, 
                    message: "User cannot been created", 
                    code: 400   
                })
        }
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


module.exports = {getAll, getOne, createUser, updateUser, deleteUser}