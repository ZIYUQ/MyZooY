const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    age: { type: Number },
    emailAddress: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Prefer not to say"] },
    location: { city: String, state: String, country: String },
    avatar: {
        data: { type: String, default: undefined },
        contentType: { type: String, default: "image" }
    },
    password: { type: String, required: true },
    ban: { type: Boolean, required: true },
    active: { type: Boolean },
    code: { type: String }
})



userSchema.methods.generateHash = function (word) {
    return bcrypt.hashSync(word, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.validCode = function (code) {
    return bcrypt.compareSync(code, this.code);
}

const User = mongoose.model("User", userSchema)

module.exports = User