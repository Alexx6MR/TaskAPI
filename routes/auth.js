const express = require("express")
const route = express.Router();
const {validationLogin, validationRegister} = require("../validators/auth.validator")
const {register, login} = require("../controllers/auth.controller")

route.post("/register", validationRegister, register)


route.post("/login", validationLogin, login)





module.exports = route;