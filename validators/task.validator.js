const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateTask = [
    check("title")
    .exists()
    .notEmpty(),
    check("content")
    .exists()
    .notEmpty(),

    (req, res, next)=> validateResults(req, res, next)

]


module.exports = {validatorCreateTask}