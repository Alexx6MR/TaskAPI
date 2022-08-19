const express = require("express")
const route = express.Router();

const {validatorCreateTask} = require("../validators/task.validator")
const {authMiddleware} = require("../middleware/session")

const {getAllTask, getOneTask, createTask, updatetask, deletetask} = require("../controllers/task.controller")
const checkRol = require("../middleware/checkRol")


route.get("/", getAllTask )

route.get("/:id", getOneTask)

route.post("/create", validatorCreateTask, createTask)

route.put("/update/:id", updatetask)

route.delete("/delete/:id", deletetask)

module.exports = route;