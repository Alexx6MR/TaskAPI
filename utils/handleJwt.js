const jwt = require("jsonwebtoken")


const JWT_SECRET = process.env.JWT_SECRET

const signToken = async (user) => {
    return await jwt.sign({
        _id: user._id,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn: "2h"
    }
    );

  
}


const verifyToken = async (tokenJwt) => {
    try {
        return await jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
}


module.exports = {signToken, verifyToken}