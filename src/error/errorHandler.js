'use strict'

const sequelize = require('sequelize')
const uuid4 = require('uuid/v4')

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
  console.log(err.stack)
  if (!(err instanceof ApiError)) {
    let status
    if (err instanceof sequelize.ValidationError) {
      status = 400
    } else {
      status = 500
    }
    err = new ApiError(status, err.message)
  }
  console.log(err.toString())
  response.status(err.status).json(err)
}

module.exports = { ApiError: ApiError, handler: handler }
