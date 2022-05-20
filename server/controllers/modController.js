const Moderator = require('../models/moderator')
const { Post } = require('../models/post')
const User = require('../models/user')
const passport = require("passport");
require('../config/passport')(passport)
const jwt = require("jsonwebtoken");

const ModLogin = async (req, res, next) => {
    passport.authenticate('local-mlogin', (err, mod, info) => {
        // If there were errors during executing the strategy or the user was not found, we display and error
        if (err) {
            return res.status(500).json({ error: info.message })
        } else if (!mod) {
            return res.status(401).json({ error: info.message })
        }
        req.login(mod, { session: false }, async (error) => {
            if (error) return next(error);
            const body = { _id: mod._id };

            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            return res.status(200).json({ data: mod, token: token });
        });
    })(req, res, next)
}


const ModSignup = (req, res, next) => {
    passport.authenticate('local-msignup', (err, mod, info) => {
        if (err) {
            return res.status(500).json({ error: info.message })
        }
        // If the user is not found or there is some mistakes in password, return error message
        else if (!mod) {
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


const ViewUsers = async (req, res) => {
    try {
        let users = await User.find({})
        return res.status(200).json({ data: "Success", users: users })
    } catch (error) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const BanUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.query.userid }, { $set: { ban: true } })
        return res.status(200).json({ data: "Success" })
    }
    catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const ViewPosts = async (req, res) => {
    try {
        let posts = await Post.find({ allowed: false }).sort({ createdAt: 1 });
        return res.status(200).json({ data: "Success", posts: posts })
    } catch (error) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const AllowPost = async (req, res) => {
    try {
        await Post.updateOne({ _id: req.query.postid }, { $set: { allowed: true } })
        return res.status(200).json({ data: "Allow" })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const RejectPost = async (req, res) => {
    try {
        await Post.updateOne({ _id: req.query.postid }, { $set: { rejected: true } })
        return res.status(200).json({ data: "Rejected" })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

module.exports = { ViewUsers, BanUser, ViewPosts, AllowPost, RejectPost, ModLogin, ModSignup }