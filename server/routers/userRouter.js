const express = require("express")
const userController = require('../controllers/userController')

const userRouter = express.Router()
const passport = require('passport')

userRouter.post('/login', userController.UserLogin)

userRouter.post('/register', userController.UserSignup)

userRouter.post("/avatar/upload", userController.AvatarUpload)
module.exports = userRouter