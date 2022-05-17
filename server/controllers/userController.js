const User = require('../models/user');
const passport = require("passport");
require('../config/passport')(passport)
const jwt = require("jsonwebtoken");
const uploadImage = require("../middleware/uploadImage")

const UserLogin = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        // If there were errors during executing the strategy or the user was not found, we display and error
        if (err) {
            return res.status(500).json({ error: info.message })
        } else if (!user) {
            return res.status(401).json({ error: info.message })
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
    console.log(req.body)
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: info.message })
        }
        // If the user is not found or there is some mistakes in password, return error message
        else if (!user) {
            return res.status(400).json({ error: info.message })
        }
        // req.login(user, { session: false }, async (error) => {

        //     if (error) return next(error);

        //     const body = { _id: user._id };
        //     //Sign the JWT token and populate the payload with the user email
        //     //Send back the token to the client
        //     const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
        //     return res.send(200).json({ data: user, token: token });
        // });
        return res.status(200).json({ data: 'SUCCESSS' })
    })(req, res, next)
}

const UserSignUpVerification = async (req, res) => {
    try {
        let code = req.body.verificationCode
        let email = req.body.emailAddress

        const user = await User.findOne({ emailAddress: email }, {})
        if (user.validCode(code)) {
            await User.updateOne({ emailAddress: email }, { $set: { active: true } })
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = { _id: user._id };

                //Sign the JWT token and populate the payload with the user email
                const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
                //Send back the token to the client
                return res.status(200).json({ data: user, token: token });
            });
        } else {
            return res.status(401).json({ error: "Code is not correct" })
        }

    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const UserInfo = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id }, {})
        return res.status(200).json({ data: "success", user: user })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}



module.exports = { UserLogin, UserSignup, UserSignUpVerification, UserInfo }