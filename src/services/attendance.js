const { attendance: Attendance, staff: Staff } = require('#models')
const QueryHelper = require('#helpers/QueryHelper')
const Sequelize = require('sequelize')
const { Op } = Sequelize

const AttendanceService = {
  // METHODS
  async create (payload) {
    return await Attendance.create(payload)
  },

  async list (query = {}, staffId) {
    const whereClause = { }

    if (query.date) {
      whereClause.clock_in = {
        [Op.gte]: query.date + 'T00:00:00Z',
        [Op.lte]: query.date + 'T23:59:59Z'
      }
    }

    const { rows, count } = await Staff.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],
      attributes: [
        'staffId',
        'username'
      ],
      include: [{
        model: Attendance,
        attributes: [
          'clock_in',
          'clock_out'
        ],
        where: whereClause,
        required: true
      }],
      where: {
        staffId
      },
      subQuery: false
    })

    return {
      attendance: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count)
    }
  },

  async checkIn (today, staff_id) {
    return await Attendance.findOne({
      where: {
        staff_id,
        clock_in: {
          [Sequelize.Op.gte]: today + 'T00:00:00Z',
          [Sequelize.Op.lte]: today + 'T23:59:59Z'
        }
      }
    })
  },

  async checkOut (today, staff_id) {
    return await Attendance.findOne({
      where: {
        clock_out: null,
        staff_id,
        clock_in: {
          [Sequelize.Op.gte]: today + 'T00:00:00Z',
          [Sequelize.Op.lte]: today + 'T23:59:59Z'
        }
      }
    })
  },

  async update (payload, today, staff_id) {
    return await Attendance.update(payload, {
      where: {
        clock_in: {
          [Sequelize.Op.gte]: today + 'T00:00:00Z',
          [Sequelize.Op.lte]: today + 'T23:59:59Z'
        },
        staff_id
      }
    })
  }
}

module.exports = AttendanceService
