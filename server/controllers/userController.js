const User = require('../models/user');
const passport = require("passport");
require('../config/passport')(passport)
const jwt = require("jsonwebtoken");
const db = require("../db").default
const uploadImage = require("../middleware/uploadImage")

const UserLogin = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        // If there were errors during executing the strategy or the user was not found, we display and error
        if (err) {
            return res.status(500).json({ error: info.message })
        } else if (!user) {
            return res.status(400).json({ error: info.message })
        }
        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            const body = { _id: user._id };

            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            return res.status(200).json({ data: user, token: token });
        });
    })(req, res, next)
}

const UserSignup = (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.sendStatus(500).json({ error: info.message })
        }
        // If the user is not found or there is some mistakes in password, return error message
        else if (!user) {
            return res.sendStatus(400).json({ error: info.message })
        }
        req.login(user, { session: false }, async (error) => {

            if (error) return next(error);

            const body = { _id: user._id };
            //Sign the JWT token and populate the payload with the user email
            //Send back the token to the client
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            return res.sendStatus(200).json({ data: user, token: token });
        });
    })(req, res, next)
}

const AvatarUpload = async (req, res) => {
    try {
        await uploadImage(req, res);
        console.log(req.file);
        if (req.file == undefined) {
            return res.send({
                success: false, message: "You must select a file.",
            });
        }
        return res.send({
            message: "File has been uploaded.",
        });
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Error when trying upload image: ${error}",
        });
    }
};

module.exports = { UserLogin, UserSignup, AvatarUpload }