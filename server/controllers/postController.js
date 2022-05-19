const { Post } = require('../models/post')
const { CommentPost } = require('../models/post');
const User = require('../models/user');

const AllPost = async (req, res) => {
    try {
        let allPost = await Post.find({}).populate("userID").sort({ updatedAt: -1 });
        return res.status(200).json({ data: "Success", posts: allPost })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: "Bad Request" })
    }
}

const SinglePost = async (req, res) => {
    try {
        let singlePost = await Post.findOne({ _id: req.query.postid }).populate("userID");
        let commentList = singlePost.comments.reverse();
        let comments = new Array();
        for (i = 0; i < commentList.length; i++) {
            let comment = await CommentPost.findOne({ _id: commentList[i] }).populate("userID");
            comments.push(comment)
        }
        return res.status(200).json({ data: "Success", post: singlePost, comments: comments })

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
        await Post.updateOne({ _id: req.query.postid }, { $push: { comments: commentPost._id } })
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