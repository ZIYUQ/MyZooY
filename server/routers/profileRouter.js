const express = require("express")
const profileController = require('../controllers/profileController')

const profileRouter = express.Router()
const passport = require('passport')

profileRouter.post('/update/age',
    passport.authenticate('jwt', { session: false }), (req, res) => profileController.UpdateAge(req, res))

profileRouter.post('/update/location',
    passport.authenticate('jwt', { session: false }), (req, res) => profileController.UpdateLocation(req, res))

profileRouter.post('/update/gender',
    passport.authenticate('jwt', { session: false }), (req, res) => profileController.UpdateGender(req, res))

profileRouter.post('/update/avatar',
    passport.authenticate('jwt', { session: false }), (req, res) => profileController.UpdateAvatar(req, res))

profileRouter.post('/update/all',
    passport.authenticate('jwt', { session: false }), (req, res) => profileController.UpdateAll(req, res))
module.exports = profileRouter