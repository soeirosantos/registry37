'use strict'

const Sequelize = require('sequelize')
const sequelize = require('./db')

const Metadata = sequelize.define('metadata', {
  key: {
    type: Sequelize.STRING,
    validate: {min: 3, max: 255, notEmpty: true, notNull: true}
  },
  value: {
    type: Sequelize.STRING,
    validate: {min: 3, max: 255, notEmpty: true, notNull: true}
  }
})

module.exports = Metadata