'use strict'

const Sequelize = require('sequelize')
const ENV = process.env.NODE_ENV || 'dev'
const dbconfig = require('./dbconfig')[ENV]

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.user,
  dbconfig.password,
  dbconfig)

module.exports = sequelize
