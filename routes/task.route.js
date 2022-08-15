const express = require("express")
const route = express.Router();

const {validatorCreateTask} = require("../validators/task.validator")

const {getAllTask, getOneTask, createTask, updatetask, deletetask} = require("../controllers/task.controller")



route.get("/", getAllTask )

route.get("/:id", getOneTask)

route.post("/create", validatorCreateTask, createTask)

route.put("/update/:id", updatetask)

route.delete("/delete/:id", deletetask)

module.exports = route;