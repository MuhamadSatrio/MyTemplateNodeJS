'use strict'

module.exports = function BadRequestError (errors) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.errors = errors
}

require('util').inherits(module.exports, Error)
