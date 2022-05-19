const mongoose = require("mongoose")

const commentPostSchema = new mongoose.Schema({
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, maxlength: 250 },
    like: { type: Number, default: 0 },
}, { timestamps: true })

const CommentPost = mongoose.model("CommentPost", commentPostSchema)

const postSchema = new mongoose.Schema({
    allowed: { type: Boolean },
    userID: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "CommentPost" }],
    content: { type: String, maxlength: 250 },
    title: { type: String },
    like: { type: Number, default: 0, min: 0 },
    rejected: { type: Boolean }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)


module.exports = { Post, CommentPost }