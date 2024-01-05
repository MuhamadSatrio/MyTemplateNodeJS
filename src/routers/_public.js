const express = require('express')
const router = express.Router()
const RootController = require('#controllers/root')
const StaffController = require('#controllers/staff')

router.get('/', RootController.root)

router.post('/register', StaffController.register)
router.get('/login/google/callback', StaffController.callback)
router.get('/login/google', StaffController.loginGoogle)
router.post('/login', StaffController.login)

module.exports = router
