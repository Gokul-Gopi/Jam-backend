const express = require('express');
const router = express.Router();
const { authVerify } = require('../Controllers/user.controller')
const { createComment } = require('../Controllers/comment.controller')
const { setUpNortificationBox } = require('../Controllers/nortification.controller')

router.post('/:postID', authVerify, setUpNortificationBox, createComment)


module.exports = router