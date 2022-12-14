const express = require("express")
const postController = require('../controllers/postController')
const passport = require('passport')
const postRouter = express.Router()

postRouter.post('/create',
    passport.authenticate('user_jwt', { session: false }), (req, res) => postController.NewPost(req, res))

postRouter.post('/comment?',
    passport.authenticate('user_jwt', { session: false }), (req, res) => postController.Comment(req, res))

//localhost:8000/post/select?postid={{post id value}}
postRouter.get('/select?', postController.SinglePost)

postRouter.get('/', postController.AllPost)

postRouter.get('/like_post?',
    passport.authenticate('user_jwt', { session: false }), (req, res) => postController.LikePost(req, res))

postRouter.get('/like_comment?',
    passport.authenticate('user_jwt', { session: false }), (req, res) => postController.LikeCommentPost(req, res))

postRouter.get('/cancel_like?',
    passport.authenticate('user_jwt', { session: false }), (req, res) => postController.CancelLike(req, res))
module.exports = postRouter