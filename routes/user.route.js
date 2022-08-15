const express = require("express")
const route = express.Router();
const {validationCreateUser, validationUpdateUser} = require("../validators/user.validator")
const adminAuth = require("../validators/admin.validator")


const {getAll, getOne, createUser, deleteUser, updateUser} = require("../controllers/user.controller")

route.get("/", adminAuth , getAll)

route.get("/:id", getOne)

route.post("/create", validationCreateUser, createUser)

route.put("/update/:id", validationUpdateUser, updateUser)

route.delete("/delete/:id", deleteUser)



module.exports = route;