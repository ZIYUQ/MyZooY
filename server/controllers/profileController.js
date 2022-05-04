
const User = require('../models/user');

const UpdateAge = async (req, res) => {
    try {
        let userID = req.body.userID
        await User.updateOne({ _id: userID }, { $set: { age: req.body.age } })
    } catch (err) {
        return res.send(400).json({ error: "Bad Request" })
    }
}

const UpdateLocation = async (req, res) => {
    try {
        let userID = req.body.userID
        await User.updateOne({ _id: userID }, { $set: { location: req.body.location } })
    } catch (err) {
        return res.send(400).json({ error: "Bad Request" })
    }
}

const UpdateGender = async (req, res) => {
    try {
        let userID = req.body.userID
        await User.updateOne({ _id: userID }, { $set: { gender: req.body.gender } })
    } catch (err) {
        return res.send(400).json({ error: "Bad Request" })
    }
}

module.exports = { UpdateAge, UpdateGender, UpdateLocation }