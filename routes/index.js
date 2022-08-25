const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const item = require('./modules/item')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/auth',auth)
router.use('/item', authenticator, item)
router.use('/user', user)
router.use('/', authenticator, home)

module.exports = router