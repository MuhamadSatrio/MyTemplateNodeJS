const ChangePasswordSchema = {
  type: 'object',
  properties: {
    newPassword: {
      type: 'string',
      minLength: 8
    },
    newPasswordConfirmation: {
      type: 'string',
      minLength: 8
    }
  },
  additionalProperties: false,
  required: ['newPassword', 'newPasswordConfirmation']
}

const RegisterSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 8
    }
  },
  additionalProperties: false,
  required: ['username', 'firstName', 'lastName', 'email', 'password']
}

const UpdateSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    }
  },
  additionalProperties: false,
  required: []
}

const LoginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['email', 'password']
}

module.exports = { ChangePasswordSchema, RegisterSchema, LoginSchema, UpdateSchema }
