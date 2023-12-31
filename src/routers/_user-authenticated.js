const express = require('express')
const router = express.Router()

const StaffRouter = require('./staff')
const AttendanceRouter = require('./attendance')

router.use('/staff', StaffRouter)
router.use('/attendance', AttendanceRouter)

module.exports = router
