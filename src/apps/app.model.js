'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../infra/db')

const App = sequelize.define('app', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {min: 3, max: 255, notEmpty: true}
  }
})

App.sync({force: true})

module.exports = App
