const mongoose = require("mongoose");

const dbConnect = () => {
    try {

        const DB_URI = process.env.DB_URI;
        mongoose.connect( DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        }, (err, res)=>{
            if(!err){
                console.log("*** CONEXION CORRECTA ***");
            }else{
                console.log("*** ERROR DE CONEXION ***");
                console.log(err)
            }

        })
        
    } catch (e) {
        console.log("URI NOT FOUND")
    }
    


}



module.exports = dbConnect;