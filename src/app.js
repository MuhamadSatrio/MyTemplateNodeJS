require('dotenv').config()

const express = require('express')
require('express-async-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const sanitizer = require('#middlewares/request-sanitizer')
const serializer = require('#middlewares/response-serializer')

const badRequestHandler = require('#errors/handlers/bad-request')
const generalErrorHandler = require('#errors/handlers/general-error')
const sequelizeHandler = require('#errors/handlers/sequelize')

const app = express()
const port = process.env.PORT || 3010
const router = require('#routers')

app.set('trust proxy', true)
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(sanitizer)
app.use(serializer)
app.use(cookieParser())
app.use('/public', express.static('public'))

// ROUTERS
app.use(router)

// ERROR HANDLERS
app.use(badRequestHandler)
app.use(generalErrorHandler)
app.use(sequelizeHandler)

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
