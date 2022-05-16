const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    allowed: { type: Boolean },
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comment: [{ type: mongoose.Types.ObjectId, required: true, ref: "commentPost" }],
    content: { type: String, maxlength: 250 },
    title: { type: String },
    like: { type: Number, default: 0 },
    rejected: { type: Boolean }
}, { timestamps: true })

const commentPostSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, maxlength: 250 },
    like: { type: Number, default: 0 },
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)
const CommentPost = mongoose.model("CommentPost", commentPostSchema)

module.exports = { Post, CommentPost }