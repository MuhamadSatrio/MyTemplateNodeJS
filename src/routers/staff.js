const express = require('express')
const router = express.Router()
const multer = require('#helpers/multer/multer')

const StaffController = require('#controllers/staff')

router.get('/list', StaffController.list)
router.get('/profile', StaffController.profile)
router.patch('/change/password', StaffController.changePassword)
router.delete('/delete', StaffController.delete)
router.patch('/update', multer.image('staff').single('image'), StaffController.updateMyProfile)

module.exports = router
