'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../infra/db')

const Metadata = sequelize.define('metadata', {
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 3, max: 255, notEmpty: true }
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 3, max: 255, notEmpty: true }
  },
  // It's a decision to let the model
  // flat and don't rely on details
  // of relationship mapping in Sequelize
  appName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 3, max: 255, notEmpty: true }
  },
  instanceId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 3, max: 255, notEmpty: true }
  }
},
{
  indexes: [
    {
      unique: true,
      fields: ['appName', 'instanceId', 'key']
    }]
})

if (['dev', 'test'].indexOf(process.env.NODE_ENV) >= 0) {
  Metadata.sync({ force: true }).then(() => {
    return Metadata.bulkCreate([{
      key: 'someKey',
      value: 'value',
      instanceId: 'instance1',
      appName: 'foo'
    }, {
      key: 'anotherKey',
      value: 'value',
      instanceId: 'instance1',
      appName: 'foo'
    }, {
      key: 'oneMoreKey',
      value: 'value',
      instanceId: 'instance3',
      appName: 'bar'
    }])
  })
}

module.exports = Metadata
