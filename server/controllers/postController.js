const { Post } = require('../models/post')
const { CommentPost } = require('../models/post')

const AllPost = async (req, res) => {
    try {
        let allPost = await Post.find({}).populate("userID");
        return res.status(200).json({ data: "Success", posts: allPost })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: "Bad Request" })
    }
}

const SinglePost = async (req, res) => {
    try {
        let singlePost = await Post.findOne({ _id: req.query.postid }).populate("comments").populate("userID");
        return res.status(200).json({ data: "Success", post: singlePost })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: "Bad Request" })
    }
}

const NewPost = async (req, res) => {
    try {
        let newPost = new Post();
        newPost.title = req.body.title;
        newPost.content = req.body.content;
        newPost.userID = req.user._id;
        newPost.allowed = false;
        newPost.comments = new Array();
        newPost.rejected = false;
        await newPost.save();
        return res.status(200).json({ data: "Success" })

    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const Comment = async (req, res) => {
    try {
        let newPost = new CommentPost()
        newPost.content = req.body.content
        newPost.userID = req.user._id
        let commentPost = await newPost.save()
        await Post.updateOne({ _id: req.body.postID }, { $push: { comments: commentPost._id } })
        return res.status(200).json({ data: "Success" })

    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const LikePost = async (req, res) => {
    try {
        let postID = req.query.postid;
        await Post.updateOne({ _id: postID }, { $inc: { like: 1 } })
        return res.status(200).json({ data: "Success" })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const LikeCommentPost = async (req, res) => {
    try {
        let postID = req.query.postid;
        await CommentPost.updateOne({ _id: postID }, { $inc: { like: 1 } })
        return res.status(200).json({ data: "Success" })
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}


module.exports = { AllPost, NewPost, Comment, SinglePost, LikePost, LikeCommentPost }