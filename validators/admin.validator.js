

const adminAuth = (req, res, next) =>{
    const userrole = req.headers.role
    
    if(userrole == "ADMIN"){
        return next()
    }else{
        res.status(403)
        res.send({msg: "NOT AUTHORIZATION" })
    }
    
}



module.exports = adminAuth