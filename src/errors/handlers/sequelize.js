const Sequelize = require('sequelize')

module.exports = async (error, req, res, next) => {
  switch (error.constructor) {
    case Sequelize.ValidationError:
      return res.status(400).send({
        errors: [error.message],
        status: error.name,
        message: error.message,
        code: '400'
      })
    case Sequelize.UniqueConstraintError:
      return res.status(409).send({
        errors: [error.errors[0].message],
        status: error.name,
        message: error.message,
        code: '409'
      })
    case Sequelize.DatabaseError:
      return res.status(500).send({
        errors: [error.message],
        status: error.name,
        message: error.message,
        code: '500'
      })
    default:
      next(error)
  }
}
