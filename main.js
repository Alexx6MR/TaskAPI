require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/mongo")
const Route = require("./routes")


const PORT = process.env.PORT || 3000

const app = express();

//Middelware;
app.use(cors());
app.use(express.json())


app.use(Route); //RUTAS DINAMICAS

dbConnect();

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`) )