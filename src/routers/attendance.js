const express = require('express')
const router = express.Router()

const AttendanceController = require('#controllers/attendance')

router.get('/list', AttendanceController.list)
router.post('/', AttendanceController.clockIn)
router.patch('/', AttendanceController.clockOut)

module.exports = router
