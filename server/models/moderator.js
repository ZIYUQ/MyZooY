const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const moderatorSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
moderatorSchema.methods.generateHash = function (word) {
    return bcrypt.hashSync(word, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
moderatorSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const Moderator = mongoose.model("Moderator", moderatorSchema)

module.exports = Moderator