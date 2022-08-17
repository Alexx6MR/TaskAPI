const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")


const validationLogin = [
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("password")
    .exists()
    .notEmpty(),

    (req, res, next)=> validateResults(req, res, next)
    
    
]

const validationRegister = [
    check("username")
    .exists()
    .notEmpty()
    .isLength({min:3, max: 20}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("password")
    .exists()
    .notEmpty(),

    (req, res, next)=> validateResults(req, res, next)
    
    
]

module.exports = {validationRegister, validationLogin}