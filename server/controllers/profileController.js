
const User = require('../models/user');

const updateAge = async (req, res) => {
    try {
        let userID = req.body.userID
        await User.updateOne({ _id: userID }, { $set: { age: req.body.age } })


    } catch (err) {
        return res.sendStatus(400).json({ error: "Website cracked" })
    }
}