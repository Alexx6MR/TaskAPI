const {userModel} = require("../models")
const {encrypt } = require("../utils/handlePassword")


const createAdmin = async () =>{
   const user = {
      username: "Alexei",
      email: "alexei@email.com",
      password: await encrypt("alexeipsw"),
      role: "ADMIN"
  }

   const admin = await userModel.findOne({email: user.email})
   
   if(!admin){
      try {        
         const newuser = await userModel.create(user);
         await newuser.save();
 
         console.log("Admin Created")
      
      } catch (err) {
         console.log("error", err)
 

      }
}
   
   
        

}


module.exports =  createAdmin