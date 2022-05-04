const mongoose = require("mongoose")
const moderatorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const Moderator = mongoose.model("Moderator", moderatorSchema)

module.exports = Moderator