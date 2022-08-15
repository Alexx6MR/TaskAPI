const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validationCreateUser = [
    check("username")
    .exists()
    .notEmpty(),
    check("email")
    .exists()
    .notEmpty(),
    check("password")
    .exists()
    .notEmpty(),

    (req, res, next)=> validateResults(req, res, next)
    
    
]

const validationUpdateUser = [
    check("_id")
    .exists()
    .notEmpty(),
    check("username")
    .exists()
    .notEmpty(),
    check("email")
    .exists()
    .notEmpty(),
    check("password")
    .exists()
    .notEmpty(),

    (req, res, next)=> validateResults(req, res, next)
]


module.exports = {validationCreateUser, validationUpdateUser}