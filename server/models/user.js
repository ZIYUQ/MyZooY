const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const avatarSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String }
})

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    age: { type: Number },
    emailAddress: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Prefer not to say"] },
    location: { city: String, state: String, country: String },
    avatar: avatarSchema,
    password: { type: String, required: true },
    ban: { type: Boolean, required: true },
    active: { type: Boolean }
})



userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema)
const Avatar = mongoose.model("Avatar", avatarSchema)

module.exports = User, Avatar