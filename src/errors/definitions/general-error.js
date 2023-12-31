module.exports = class GeneralError extends Error {
  // AUTH
  static unauthorized () {
    return new GeneralError(401, {
      message: 'Unauthorized',
      code: 100
    })
  }

  static invalidLoginCredential () {
    return new GeneralError(400, {
      message: 'Invalid login credential',
      code: 101
    })
  }

  static emailAlreadyUsed () {
    return new GeneralError(400, {
      message: 'Email already used',
      code: 102
    })
  }

  static passwordRequired () {
    return new GeneralError(400, {
      message: 'Password required',
      code: 103
    })
  }

  static passwordNotRequired () {
    return new GeneralError(400, {
      message: 'Password not required for LDAP registration',
      code: 104
    })
  }

  static newPasswordNotMatching () {
    return new GeneralError(400, {
      message: 'New password not matching',
      code: 105
    })
  }

  static userNotFound () {
    return new GeneralError(404, {
      message: 'User not found',
      code: 106
    })
  }

  static userHasRequest () {
    return new GeneralError(404, {
      message: 'User has request material',
      code: 107
    })
  }

  static invalidRole () {
    return new GeneralError(400, {
      message: 'Role that is owned is not appropriate',
      code: 108
    })
  }

  static invalidStaff () {
    return new GeneralError(400, {
      message: 'Staff are only allowed to update their own properties',
      code: 108
    })
  }

  static IncorrectFormatEmail () {
    return new GeneralError(400, {
      message: 'Incorrect email format',
      code: 109
    })
  }

  // UTILITIES (QUERY, etc)
  static invalidSortingOrder () {
    return new GeneralError(400, {
      message: 'Invalid sorting order',
      code: 201
    })
  }

  static invalidBooleanStringValue () {
    return new GeneralError(400, {
      message: 'Invalid boolean string value',
      code: 202
    })
  }

  // ATTENDANCE
  static hasBeenAbsent () {
    return new GeneralError(401, {
      message: 'you has been absent',
      code: 301
    })
  }

  static hasBeenOut () {
    return new GeneralError(401, {
      message: 'you has been out',
      code: 302
    })
  }

  // ALL
  static emptyBody () {
    return new GeneralError(400, {
      message: 'Please complete all fields',
      code: 1301
    })
  }

  constructor (httpStatusCode, ...errors) {
    super(errors[0].message)
    this.httpStatusCode = httpStatusCode
    this.name = this.constructor.name
    this.errors = errors
  }
}

require('util').inherits(module.exports, Error)
