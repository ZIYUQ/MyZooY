const { Post } = require('../models/post')
const { CommentPost } = require('../models/post')
const NewPost = async (req, res) => {
    try {
        let newPost = new Post();
        newPost.text = req.body.text;
        newPost.content = req.body.content;
        newPost.userID = req.body.user;
        newPost.allowed = false;
        newPost.comment = new Array();
        newPost.rejected = false;
    } catch (err) {
        return res.status(400).json({ error: "Bad Request" })
    }
}

const commentPost = async (req, res) => {

}

module.exports = { NewPost }