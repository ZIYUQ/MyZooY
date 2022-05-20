const express = require("express")
const userController = require('../controllers/userController')
//const postController = require('../controllers/postController')
const userRouter = express.Router()
const passport = require('passport')

userRouter.post('/login', userController.UserLogin)

userRouter.post('/register', userController.UserSignup)

userRouter.post('/register/verification', userController.UserSignUpVerification)

//userRouter.post('/create_post',
//    passport.authenticate('jwt', { session: false }), (req, res) => postController.NewPost(req, res))

userRouter.get('/getuserinfo',
    passport.authenticate('user_jwt', { session: false }), (req, res) => userController.UserInfo(req, res))
module.exports = userRouter