const bcryptjs = require("bcryptjs")



const encrypt = async (passwordPlain) =>{
    return await bcryptjs.hash(passwordPlain, 10);
}


const compare = async (passwordPlain, hashPassword) =>{
    return await bcryptjs.compare(passwordPlain, hashPassword)
}



module.exports = {encrypt, compare}