'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../infra/db')

const App = sequelize.define('app', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 3, max: 255, notEmpty: true }
  }
},
{
  indexes: [
    {
      unique: true,
      fields: ['name']
    }]
})

if ([ 'dev', 'test' ].indexOf(process.env.NODE_ENV) >= 0) {
  App.sync({ force: true }).then(() => {
    return App.bulkCreate([{
      name: 'foo'
    }, {
      name: 'bar'
    }])
  })
}

module.exports = App
