const GeneralError = require('#errors/definitions/general-error')

const errors = [GeneralError]

module.exports = (errorObj, _, res, next) => {
  if (!errors.includes(errorObj.constructor)) return next(errorObj)
  return res.status(errorObj.httpStatusCode).send({
    errorStatus: true,
    errorType: 'General Error',
    errors: errorObj.errors
  })
}
