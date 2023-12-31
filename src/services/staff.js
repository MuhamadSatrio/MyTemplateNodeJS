const { staff: Staff } = require('#models')
const QueryHelper = require('#helpers/QueryHelper')

const {
  BASE_URL
} = process.env

const StaffService = {
  // PROPERTIES
  filterAttributes: [
    'staffId'
  ],
  searchAttributes: [
    'email',
    'username'
  ],

  // METHODS
  async create (payload) {
    return await Staff.create(payload)
  },

  async list (query = {}) {
    const { searchAttributes, filterAttributes } = StaffService

    const { rows, count } = await Staff.findAndCountAll({
      ...QueryHelper.getPaginationQuery(query),
      order: [...QueryHelper.getSortQuery(query)],
      where: {
        ...QueryHelper.getSearchQuery(query, {
          searchAttributes
        }),
        ...QueryHelper.getFilterQuery(query, {
          filterAttributes
        })
      },
      subQuery: false
    })

    return {
      staff: rows,
      totalData: count,
      totalPage: QueryHelper.countTotalPage(query, count)
    }
  },

  async findById (staffId) {
    return await Staff.findOne({
      where: { staffId }
    })
  },

  async findByEmail (email) {
    return await Staff.findOne({
      where: { email }
    })
  },

  async update (staffId, req, payload) {
    if (req.file) {
      const file_url = req.file.path
      const photo_url = `${BASE_URL}/${file_url}`
      req.body.image = photo_url
    }

    return await Staff.update(payload, {
      where: { staffId }
    })
  },

  async delete (staffId) {
    return await Staff.destroy({
      where: { staffId }
    })
  }
}

module.exports = StaffService
