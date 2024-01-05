const { RegisterSchema, LoginSchema, ChangePasswordSchema, UpdateSchema } = require('./staff-schema')
const StaffService = require('#services/staff')
const validator = require('validator')
const Bcrypt = require('#helpers/Bcrypt')
const jwt = require('jsonwebtoken')
const GeneralError = require('#errors/definitions/general-error')
require('dotenv').config()
const { google } = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3010/login/google/callback'
)

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true
})

module.exports = class Controller {
  static async loginGoogle (req, res) {
    res.redirect(authorizationUrl)
  }

  static async callback (req, res) {
    const { code } = req.query
    const { tokens } = await oauth2Client.getToken(code)

    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    })

    const { data } = await oauth2.userinfo.get()
    const user = await StaffService.findByEmail(data.email)
    if (!user) throw GeneralError.invalidLoginCredential()

    const token = jwt.sign(
      {
        staffId: user.staffId,
        username: user.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    return res.json({
      staffId: user.staffId,
      token
    })
  }

  static async list (req, res) {
    const { query } = req

    const { staff, totalData, totalPage } = await StaffService.list(query)

    return res.serialize({
      staff,
      totalData,
      totalPage
    })
  }

  static async register (req, res) {
    const { body } = req
    const { email, password } = body

    await Controller._validation(body)

    if (!validator.isEmail(body.email)) {
      throw GeneralError.IncorrectFormatEmail()
    }

    req.sanitize(RegisterSchema, body)

    /**
     * check if email already used
     */
    const isEmailExist = await StaffService.findByEmail(email)
    if (isEmailExist) throw GeneralError.emailAlreadyUsed()

    const createdStaff = await StaffService.create({
      passwordHash: password,
      ...body
    })

    const accessToken = jwt.sign({
      staffId: createdStaff.staffId, username: createdStaff.username
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

    return res.serializePost({
      staffId: createdStaff.staffId,
      token: accessToken
    })
  }

  static async login (req, res) {
    const { body } = req
    const { email, password } = body

    await Controller._validation(body)

    if (!validator.isEmail(body.email)) {
      throw GeneralError.IncorrectFormatEmail()
    }

    req.sanitize(LoginSchema, body)

    const staff = await StaffService.findByEmail(email)
    if (!staff) throw GeneralError.invalidLoginCredential()

    const isMatched = Bcrypt.compare(password, staff.passwordHash)
    if (!isMatched) throw GeneralError.invalidLoginCredential()

    const accessToken = jwt.sign({
      staffId: staff.staffId, username: staff.username
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

    return res.serialize({
      staffId: staff.staffId,
      token: accessToken
    })
  }

  static async profile (req, res) {
    const { staffId } = req
    const staff = await StaffService.findById(staffId)

    return res.serialize({ staff })
  }

  static async updateMyProfile (req, res) {
    const { body, staffId } = req

    await Controller._validation(body)
    req.sanitize(UpdateSchema, body)

    const staff = await StaffService.findById(staffId)
    if (!staff) throw GeneralError.invalidStaff()
    await StaffService.update(staffId, req, body)

    return res.serialize({
      mesage: 'update profile staff success',
      staffId
    })
  }

  static async changePassword (req, res) {
    /**
     * best to verify user first with email notification or other services
     * before allowing to change password
     */
    const { staffId, body } = req
    await Controller._validation(body)
    req.sanitize(ChangePasswordSchema, body)

    const { newPassword, newPasswordConfirmation } = body
    const staff = await StaffService.findById(staffId)

    if (!staff) {
      throw GeneralError.userNotFound()
    }

    if (newPassword !== newPasswordConfirmation) {
      throw GeneralError.newPasswordNotMatching()
    }

    await StaffService.update(staffId, {
      passwordHash: Bcrypt.hash(newPassword)
    })

    return res.serialize({
      message: 'Password changed successfully',
      staffId
    })
  }

  static async delete (req, res) {
    const { staffId } = req

    const staff = await StaffService.findById(staffId)

    if (!staff) {
      throw GeneralError.userNotFound()
    }

    await StaffService.delete(staffId)

    return res.serialize({
      mesage: 'delete my account staff success',
      staffId
    })
  }

  // PRIVATE METHODS
  static async _validation (body) {
    const bodyValues = Object.values(body)
    const isEmptyValue = bodyValues.some(value => value === null)
    if (isEmptyValue) throw GeneralError.emptyBody()
    return true
  }
}
