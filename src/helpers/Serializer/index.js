const InternalServerError = require('#errors/definitions/internal-server-error')
const _ = require('lodash')
module.exports = class Serializer {
  static serializeJson (res, object, status = 200) {
    const retVal = Serializer.serialize(object)
    res.status(status).json(retVal)
  }

  static serialize (object) {
    validateJson(object)
    const retVal = { errorStatus: false, data: object }
    return retVal
  }
}

function validateJson (object) {
  const isObject = _.isPlainObject(object)
  if (!isObject) throw new InternalServerError('Response must be object')

  const keyLength = Object.keys(object).length
  if (keyLength < 1) throw new InternalServerError('Response cannot be empty')
}
