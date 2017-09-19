'use strict'

const Sequelize = require('sequelize')
const sequelize = require('./infra/db')

const App = sequelize.define('app', {
  name: {
    type: Sequelize.STRING,
    validate: {min: 3, max: 255, notEmpty: true, notNull: true}
  }
})

module.exports = App
