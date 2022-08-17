const checkRol = (req, res, next) =>{

    try {

        const userrole = req.user.role
        if(userrole == "ADMIN"){
            next()
        }else{
            res.status(401)
            res.send({msg: "NO AUTHORIZATION"})
        }
       
        
    } catch (err) {
        res.status(400)
        res.send({msg: "checkRol crashed"})
    }
    
    
}



module.exports = checkRol