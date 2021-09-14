const express = require('express');
const router = express.Router();
const { authVerify } = require('../Controllers/user.controller')
const { getNortifications, setUpNortificationBox } = require('../Controllers/nortification.controller')

router.get('/', authVerify, setUpNortificationBox, getNortifications)


module.exports = router