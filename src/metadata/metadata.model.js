'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../infra/db')

const Metadata = sequelize.define('metadata', {
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {min: 3, max: 255, notEmpty: true}
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {min: 3, max: 255, notEmpty: true}
  },
  // It's a decision to let the model
  // flat and don't rely on details
  // of relationship mapping in Sequelize
  appName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {min: 3, max: 255, notEmpty: true}
  },
  instanceId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {min: 3, max: 255, notEmpty: true}
  }
})

Metadata.sync({force: true})

module.exports = Metadata
