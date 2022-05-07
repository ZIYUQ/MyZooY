const express = require("express")
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/login', userController.UserLogin)

userRouter.post('/register', userController.UserSignup)

userRouter.post('/register/verification', userController.UserSignUpVerification)
module.exports = userRouter