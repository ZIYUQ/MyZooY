const Moderator = require('../models/moderator')
const { Post } = require('../models/post')
const User = require('../models/user')

const ModeratorLogin = async (req, res) => {

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
        await User.updateOne({ _id: req.body._id }, { $set: { ban: true } })
        return res.status(200).json({ data: "Success" })
    }
    catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const ViewPosts = async (req, res) => {
    try {
        let posts = await Post.find({});
        return res.status(200).json({ data: "Success", posts: posts })
    } catch (error) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const AllowPost = async (req, res) => {
    try {
        await Post.updateOne({ _id: req.body._id }, { $set: { allowed: true } })
        return res.status(200).json({ data: "Allow" })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const RejectPost = async (req, res) => {
    try {
        await Post.updateOne({ _id: req.body._id }, { $set: { rejected: true } })
        return res.status(200).json({ data: "Rejected" })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

module.exports = { ViewUsers, BanUser, ViewPosts, AllowPost, RejectPost }