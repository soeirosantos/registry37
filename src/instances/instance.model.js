'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../infra/db')

const Instance = sequelize.define('instance', {
  instanceId: {
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
  }
},
{
  indexes: [
    {
      unique: true,
      fields: ['appName', 'instanceId']
    }]
})

Instance.prototype.getNamespace = function () {
  return `${this.appName}:${this.instanceId}`
}

if (['dev', 'test'].indexOf(process.env.NODE_ENV) >= 0) {
  Instance.sync({ force: true }).then(() => {
    return Instance.bulkCreate([{
      instanceId: 'instance1',
      appName: 'foo'
    }, {
      instanceId: 'instance2',
      appName: 'foo'
    }, {
      instanceId: 'instance3',
      appName: 'bar'
    }])
  })
}

module.exports = Instance
