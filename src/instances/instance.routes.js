'use strict'

const _ = require('lodash')
const express = require('express')
const expressSanitized = require('express-sanitize-escape')
const router = express.Router()
const Instance = require('./instance.model')
const Metadata = require('../metadata').model
const App = require('../apps/app.model')

expressSanitized.sanitizeParams(router, ['name', 'instanceId'])

router.get('/apps/:name/instances/:instanceId', (req, res, next) => {
  Instance.findOne({ where: { appName: req.params.name, instanceId: req.params.instanceId } })
    .then(instance => {
      if (!instance) {
        res.sendStatus(404)
        return
      }
      Metadata.findAll({ where: { instanceId: instance.instanceId, appName: instance.appName } })
        .then(metadata => {
          instance = instance.toJSON()
          instance.metadata = _.map(metadata, (m) => {
            let keyValue = {}
            keyValue[m.key] = m.value
            return keyValue
          })
          res.status(200).json(instance)
        })
        .catch(err => next(err))
    })
})

router.post('/apps/:name/instances/:instanceId', (req, res, next) => {
  App.findOne({ where: { name: req.params.name } })
    .then(app => {
      if (!app) {
        res.sendStatus(404)
        return
      }
      Instance
        .create({ instanceId: req.params.instanceId, appName: req.params.name })
        .then(instance => res.status(201).json(instance))
        .catch(err => next(err))
    })
})

module.exports = router
