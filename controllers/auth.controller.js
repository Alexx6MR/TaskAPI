const {userModel} = require("../models")

const { compare, encrypt } = require("../utils/handlePassword")
const {signToken} = require("../utils/handleJwt")



const register = async (req, res) =>{
    const userexist = await userModel.findOne({email: req.body.email})
    if(userexist){
        res.status(400);
        res.send({message: "User already exist"})
    }else{
        try {
            const user = {...req.body, password: await encrypt(req.body.password) } 
            const newuser = await userModel.create(user);
            await newuser.set("password", undefined, {strict: false})
            
            const data = {
                token: await signToken(newuser) ,
                user: newuser 
            }
            res.status(201)
            res.send({ message: "User created", data })
          
        } catch (err) {
            res.status(404)
            res.send({ message: "User fail" })
        }
    }
 
}


const login = async (req, res) =>{
   
    try {
        const User = await userModel.findOne({email: req.body.email})
        .select(" password email username role");
      
        if(!User){
            res.status(404)
            res.send({error: "User not exist"})
            return
        }

        const check = await compare(req.body.password, User.get("password") )

        if(!check){
            res.status(401)
            res.send({msg: "access denied"})
            return
        }
        
        await User.set("password", undefined, {strict: false})
        
        const data = {
            token: await signToken(User),
            User
        }


       res.send({data})

    } catch (e) {
        res.status(400)
        res.send({msg:"Login has crashed"})
    }
    
 
}




module.exports = { register, login }