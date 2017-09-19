'use strict'

const Sequelize = require('sequelize')
const sequelize = require('./../infra/db')

const Instance = sequelize.define('instance', {
  instanceId: {
    type: Sequelize.STRING,
    validate: {min: 3, max: 255, notEmpty: true, notNull: true}
  }
})

module.exports = Instance
