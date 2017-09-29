'use strict'

const logger = require('winston')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const expressSanitized = require('express-sanitize-escape')
const error = require('./error')

logger.default.transports.console.colorize = true
logger.default.transports.console.timestamp = true
logger.default.transports.console.prettyPrint = process.env.ENV === 'dev'
logger.level = process.env.LOGGER_LEVEL || 'info'
// level allowed: ['test', 'error', 'warn', 'info', 'verbose', 'debug', 'silly']

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(expressSanitized.middleware())

const API_ROOT = '/api/v1'

app.use(`${API_ROOT}/health`, require('./infra/health'))
app.use(API_ROOT, require('./apps').routes)
app.use(API_ROOT, require('./instances').routes)
app.use(API_ROOT, require('./metadata').routes)
app.disable('x-powered-by')

app.use(error.handler)

const sequelize = require('./infra/db')

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.')
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err)
  })

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    logger.error('Something went wrong starting the server', err)
  }
  logger.info(`Server is listening on ${port}`)
})

module.exports = app
