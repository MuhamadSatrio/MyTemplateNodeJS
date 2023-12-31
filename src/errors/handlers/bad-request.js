const BadRequestError = require('#errors/definitions/bad-request-error')

const errors = [BadRequestError]

module.exports = (error, _, res, next) => {
  if (!errors.includes(error.constructor)) return next(error)
  return res.status(400).send({
    errors: error.errors,
    errorType: 'Bad Request Error',
    errorStatus: true
  })
}
