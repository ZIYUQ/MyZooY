
const User = require('../models/user');

const UpdateAge = async (req, res) => {
    try {
        let userID = req.user._id;
        await User.updateOne({ _id: userID }, { $set: { age: req.body.age } })
    } catch (err) {
        return res.send(400).json({ error: "Bad Request" })
    }
}

const UpdateLocation = async (req, res) => {
    try {
        let userID = req.user._id
        await User.updateOne({ _id: userID }, { $set: { location: req.body.location } })
    } catch (err) {
        return res.send(400).json({ error: "Bad Request" })
    }
}

const UpdateGender = async (req, res) => {
    try {
        let userID = req.user._id
        await User.updateOne({ _id: userID }, { $set: { gender: req.body.gender } })
    } catch (err) {
        return res.send(400).json({ error: "Bad Request" })
    }
}
const UpdateAvatar = async (req, res) => {
    try {
        let photo = {
            data: req.body.avatar,
            contentType: "image"
        }
        await User.updateOne({ _id: req.user._id }, { $set: { photo: photo } })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ success: false, error: "upload image error, failed" })
    }
}

module.exports = { UpdateAge, UpdateGender, UpdateLocation, UpdateAvatar }