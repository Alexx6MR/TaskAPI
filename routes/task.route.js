const express = require("express")
const route = express.Router();

const {validatorCreateTask} = require("../validators/task.validator")
const {authMiddleware} = require("../middleware/session")

const {getAllTask, getOneTask, createTask, updatetask, deletetask} = require("../controllers/task.controller")
const checkRol = require("../middleware/checkRol")


route.get("/", authMiddleware, checkRol,  getAllTask )

route.get("/:id", authMiddleware, getOneTask)

route.post("/create", authMiddleware, validatorCreateTask, createTask)

route.put("/update/:id",authMiddleware, updatetask)

route.delete("/delete/:id", authMiddleware, deletetask)

module.exports = route;