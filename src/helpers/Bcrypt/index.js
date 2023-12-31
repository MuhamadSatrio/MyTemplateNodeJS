const bcrypt = require('bcrypt')
const SALT_ROUNDS = 5

module.exports = class Bcrypt {
  static hash (payload) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    return bcrypt.hashSync(payload, salt)
  }

  static compare (payload, encrypted) {
    return bcrypt.compareSync(payload, encrypted)
  }
}
