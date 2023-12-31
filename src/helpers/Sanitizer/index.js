const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const BadRequestError = require('#errors/definitions/bad-request-error')

const ajv = new Ajv({
  allErrors: true
})
addFormats(ajv)

module.exports = class Sanitizer {
  static sanitizeSchema (schema, body) {
    if (ajv.validate(schema, body)) return
    Sanitizer.errorScenario1(ajv)
    Sanitizer.errorScenario2(ajv)
    Sanitizer.errorGeneral(ajv)
  }

  static errorScenario1 (ajv) {
    const errors = ajv.errors.reduce((arr, error) => {
      switch (error.keyword) {
        case 'type':
          arr.push(`Parameter '${error.dataPath.substring(1)}' invalid`)
          break
        case 'additionalProperties':
          arr.push(`Additional attribute '${error.params.additionalProperty}' should NOT be sent`)
          break
      }
      return arr
    }, [])
    if (errors.length !== 0) throw new BadRequestError(errors)
  }

  static errorScenario2 (ajv) {
    const errors = ajv.errors.reduce((arr, error) => {
      switch (error.keyword) {
        case 'required':
          arr.push(`Parameter '${error.params.missingProperty}' required`)
      }
      return arr
    }, [])
    if (errors.length !== 0) throw new BadRequestError(errors)
  }

  static errorGeneral () {
    const errors = ajv.errors.map((e) => e.schemaPath + ' ' + e.message + ' ' + JSON.stringify(e.params))
    throw new BadRequestError(errors)
  }
}
