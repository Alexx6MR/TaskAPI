const express = require("express")
const route = express.Router();
const {validationUpdateUser} = require("../validators/user.validator")



const {getAll, getOne, deleteUser, updateUser} = require("../controllers/user.controller")

route.get("/", getAll)

route.get("/:id", getOne)

route.put("/update/:id", validationUpdateUser, updateUser)

route.delete("/delete/:id", deleteUser)



module.exports = route;