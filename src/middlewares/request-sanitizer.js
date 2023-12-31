const { sanitizeSchema } = require('#helpers/Sanitizer')

module.exports = async (req, res, next) => {
  req.sanitize = (schema, body) => {
    sanitizeSchema(schema, body)
  }

  next()
}
