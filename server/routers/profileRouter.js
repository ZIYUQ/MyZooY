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

module.exports = profileRouter