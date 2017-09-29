'use strict'

const logger = require('winston')
const sequelize = require('sequelize')
const uuid4 = require('uuid/v4')

const UNEXPECTED_ERROR_MESSAGE = 'Ooops! Something really wrong happened. Please, try again later.'

const ApiError = function (status, message) {
  this.id = uuid4()
  this.status = status
  this.message = message
  this.date = new Date().toISOString()
}

ApiError.prototype.toString = function () {
  return `Error ${this.date} - ${this.id} - ${this.message}`
}

const handler = (err, request, response, next) => {
  if (err.stack) logger.error(err.stack)
  if (!(err instanceof ApiError)) {
    let status
    if (err instanceof sequelize.ValidationError) {
      status = 400
    } else {
      status = 500
    }
    err = new ApiError(status, err.message)
  }
  logger.error(err.toString(), err)
  if (process.env.NODE_ENV !== 'dev') { // avoid security flaws on sending internal errors to the client
    err.message = UNEXPECTED_ERROR_MESSAGE
  }
  response.status(err.status).json(err)
}

module.exports = { ApiError: ApiError, handler: handler }
