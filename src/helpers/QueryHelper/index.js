const { Sequelize, Op } = require('sequelize')
const GeneralError = require('#errors/definitions/general-error')

module.exports = class QueryHelper {
  static getPaginationQuery (query) {
    const pagination = {}
    const { limit, page } = query

    if (limit) {
      pagination.limit = +limit

      if (page && page > 0) {
        pagination.offset = +limit * (+page - 1) || 0
      }
    }

    return pagination
  }

  static getSortQuery (query) {
    const { sort } = query
    if (!sort) return []
    if (sort === 'random') return [Sequelize.literal('random()')]

    const [name, order] = sort.split(',')
    const isValid = order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc'

    if (!isValid) throw GeneralError.invalidSortingOrder()

    return [[name, order]]
  }

  static getSearchQuery (query, { searchAttributes = [] }, extendedSearch = {}) {
    /**
     * q: search query (keywords)
     * if not queried, bypass search query
     */
    const { q } = query
    if (!q) return {}

    /**
     * find similiar/matching value from database with iLike operator
     * for each search attributes
     */

    const searchQuery = searchAttributes.reduce((result, attribute) => {
      result[attribute] = {
        [Op.iLike]: `%${q}%`
      }

      return result
    }, {})

    return {
      [Op.or]: {
        ...searchQuery,
        ...extendedSearch
      }
    }
  }

  static getFilterQuery (
    query,
    { filterAttributes = [], booleanAttributes = [] },
    extendedFilter = {}
  ) {
    /**
     * reserved words for filter:
     * limit, page, q, select
     */
    const filterQuery = {}

    const setFilter = (attribute, value) => {
      filterQuery[attribute] = value
    }

    for (const attribute of Object.keys(query)) {
      const value = query[attribute]

      const isFilterAttribute = filterAttributes.indexOf(attribute) !== -1
      if (!isFilterAttribute) continue

      const isBoolean = booleanAttributes.indexOf(attribute) !== -1

      switch (attribute) {
        case isBoolean:
          /**
           * if attribute is boolean string, convert to boolean first
           */
          setFilter(attribute, QueryHelper.getBooleanFromString(value))
          break
        default:
          setFilter(attribute, value)
      }
    }

    return {
      ...filterQuery,
      ...extendedFilter
    }
  }

  static getRoleQuery (
    query,
    { roleAttributes = [], booleanAttributes = [] },
    extendedFilter = {}
  ) {
    /**
     * reserved words for filter:
     * limit, page, q, select
     */
    const filterQuery = {}

    const setFilter = (attribute, value) => {
      filterQuery[attribute] = value
    }

    for (const attribute of Object.keys(query)) {
      const value = query[attribute]

      const isFilterAttribute = roleAttributes.indexOf(attribute) !== -1
      if (!isFilterAttribute) continue

      const isBoolean = booleanAttributes.indexOf(attribute) !== -1

      switch (attribute) {
        case isBoolean:
          /**
           * if attribute is boolean string, convert to boolean first
           */
          setFilter(attribute, QueryHelper.getBooleanFromString(value))
          break
        default:
          setFilter(attribute, value)
      }
    }

    return {
      ...filterQuery,
      ...extendedFilter
    }
  }

  static countTotalPage (query, totalData) {
    const { limit } = query

    if (!totalData) return 0
    if (!limit) return 1

    return Math.ceil(totalData / +limit)
  }

  static getSelectQuery () {
    /**
     * TODO: select only attributes called by query.select
     */
  }

  // PRIVATE METHODS
  static getBooleanFromString (string) {
    switch (string.toLowerCase()) {
      case 'true':
        return true
      case 'false':
        return false
      default:
        throw GeneralError.invalidBooleanStringValue()
    }
  }
}
