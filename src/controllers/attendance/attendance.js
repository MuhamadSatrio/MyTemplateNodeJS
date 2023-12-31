const AttendanceService = require('#services/attendance')
const GeneralError = require('#errors/definitions/general-error')

module.exports = class Controller {
  static async list (req, res) {
    const { query, staffId } = req

    const { attendance, totalData, totalPage } = await AttendanceService.list(query, staffId)

    return res.serialize({
      attendance,
      totalData,
      totalPage
    })
  }

  static async clockIn (req, res) {
    const today = new Date().toISOString().split('T')[0]

    const checkAttendanceToday = await AttendanceService.checkIn(today, req.staffId)
    if (checkAttendanceToday) throw GeneralError.hasBeenAbsent()

    const clockIn = await AttendanceService.create({
      staff_id: req.staffId,
      clock_in: new Date()
    })
    return res.serializePost({
      mesage: 'attendance success',
      clockIn
    })
  }

  static async clockOut (req, res) {
    const today = new Date().toISOString().split('T')[0]

    const checkAttendanceToday = await AttendanceService.checkOut(today, req.staffId)
    if (!checkAttendanceToday) throw GeneralError.hasBeenOut()

    const clockOut = await AttendanceService.update({
      clock_out: new Date()
    }, today, req.staffId)

    return res.serializePost({
      mesage: 'clock out success',
      clockOut
    })
  }
}
