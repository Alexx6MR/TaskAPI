const express = require("express")
const route = express.Router();

const {validatorCreateTask} = require("../validators/task.validator")
const {authMiddleware} = require("../middleware/session")

const {getOneTask, createTask, updatetask, deletetask, getAuhtorTask} = require("../controllers/task.controller")


route.get("/", authMiddleware, getAuhtorTask )

route.get("/:id", authMiddleware, getOneTask)

route.post("/create", authMiddleware, validatorCreateTask, createTask)

route.patch("/update/:id", authMiddleware, updatetask)

route.delete("/delete/:id", authMiddleware, deletetask)


module.exports = route;