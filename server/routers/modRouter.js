const express = require("express")
const modController = require('../controllers/modController')
const modRouter = express.Router()
const passport = require('passport')
modRouter.post('/login', modController.ModLogin)

modRouter.post('/register', modController.ModSignup)

modRouter.get('/users',
    passport.authenticate('mod_jwt', { session: false }), (req, res) => modController.ViewUsers(req, res))


modRouter.get('/posts',
    passport.authenticate('mod_jwt', { session: false }), (req, res) => modController.ViewPosts(req, res))

modRouter.get('/allow?',
    passport.authenticate('mod_jwt', { session: false }), (req, res) => modController.AllowPost(req, res))

modRouter.get('/reject?',
    passport.authenticate('mod_jwt', { session: false }), (req, res) => modController.RejectPost(req, res))

modRouter.get('/ban?',
    passport.authenticate('mod_jwt', { session: false }), (req, res) => modController.BanUser(req, res))

modRouter.get('/unban?',
    passport.authenticate('mod_jwt', { session: false }), (req, res) => modController.UnbanUser(req, res))
module.exports = modRouter;