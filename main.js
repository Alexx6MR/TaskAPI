require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/mongo")
const userRoute = require("./routes/user.route")
const taskRoute = require("./routes/task.route")

const createAdmin = require("./config/admin")

const PORT = process.env.PORT || 3000

const app = express();

//Middelware;
app.use(cors());
app.use(express.json())


app.use("/user", userRoute);
app.use("/task", taskRoute);

createAdmin();
dbConnect();

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`) )