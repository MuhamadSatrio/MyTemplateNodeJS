const express = require('express')
const router = express.Router()

const publicRouter = require('./_public')
const userAuthenticatedRouter = require('./_user-authenticated')

const userAuthentication = require('#middlewares/user-authentication')

router.use(publicRouter)
router.use(userAuthentication, userAuthenticatedRouter)

module.exports = router
