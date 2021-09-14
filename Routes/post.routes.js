const express = require('express');
const router = express.Router();
const { authVerify } = require('../Controllers/user.controller')
const { createPost, likePost, getUserPosts } = require('../Controllers/post.controller')
const { setUpNortificationBox } = require('../Controllers/nortification.controller')

router.get('/', authVerify, getUserPosts)
router.post('/', authVerify, createPost)
router.post('/like/:postID', authVerify, setUpNortificationBox, likePost)

module.exports = router