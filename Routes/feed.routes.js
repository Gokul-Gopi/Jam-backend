const express = require('express');
const router = express.Router();
const { authVerify } = require('../Controllers/user.controller')
const { getFeed } = require('../Controllers/feed.controller')

router.get('/', authVerify, getFeed)

module.exports = router