const express = require('express');
const router = express.Router();
const { loginHandler, signUpHandler, getAllUsers, authVerify, followUser, getUserDetails } = require('../Controllers/user.controller')


router.get('/', authVerify, getAllUsers)
router.get('/profile', authVerify, getUserDetails)
router.post('/follow', authVerify, followUser)
router.post('/login', loginHandler)
router.post('/signup', signUpHandler)

module.exports = router