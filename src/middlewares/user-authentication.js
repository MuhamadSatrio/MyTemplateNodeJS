const GeneralError = require('#errors/definitions/general-error')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const staffToken = getAuthorizationToken(req)
  const staff = await getStaff(staffToken)
  req.staffId = staff
  return next()
}

function getAuthorizationToken (req) {
  if (!req.headers.authorization) {
    throw GeneralError.unauthorized()
  }
  const splitted = req.headers.authorization.split(' ')

  if (splitted[0] !== 'Bearer') {
    throw GeneralError.unauthorized()
  }
  return splitted
}

async function getStaff (staffToken) {
  let id
  jwt.verify(staffToken[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) throw GeneralError.unauthorized()
    id = decoded.staffId
  })
  return id
}
