const {verifyToken} = require("../utils/handleJwt")

const {userModel} = require("../models")

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            
            res.status(401)
            res.send({err: "Not authorization"})
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            res.status(401)
            res.send({err: "Error ID token"})
            return
        }


        const user = await userModel.findById(dataToken._id)
        req.user = user
        next()
        
    } catch (e) {
        res.status(400)
        res.send({err: e})
    }
}

module.exports = {authMiddleware}