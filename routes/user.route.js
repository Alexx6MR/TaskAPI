const express = require("express")
const route = express.Router();
const {validationUpdateUser} = require("../validators/user.validator")
const {getAll, getUser, deleteUser, updateUser} = require("../controllers/user.controller")

const {authMiddleware} = require("../middleware/session")


route.get("/", authMiddleware, getAll)

route.get("/:id", authMiddleware, getUser)

route.patch("/update/:id", authMiddleware, updateUser)

route.delete("/delete/:id", authMiddleware, deleteUser)



module.exports = route;