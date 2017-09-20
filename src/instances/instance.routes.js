'use strict'

const express = require('express')
const expressSanitized = require('express-sanitize-escape')
const router = express.Router()
const Instance = require('./instance.model')
const Metadata = require('../metadata').model
const App = require('../apps/app.model')
const ApiError = require('../error').ApiError

expressSanitized.sanitizeParams(router, ['name', 'instanceId'])

router.get('/apps/:name/instances/:instanceId', (req, res, next) => {
  Instance.findOne({ where: { appName: req.params.name, instanceId: req.params.instanceId } })
    .then(instance => {
      if (!instance) {
        next(new ApiError(404, 'Application Instance not found.'))
        return
      }
      Metadata.findAll({ where: { instanceId: instance.instanceId, appName: instance.appName } })
        .then(metadata => {
          instance = instance.get()
          const metadataAsSingleObject = {}
          metadata.forEach((m) => {
            metadataAsSingleObject[m.key] = m.value
          })
          instance.metadata = metadataAsSingleObject
          res.status(200).json(instance)
        })
        .catch(err => next(err))
    })
})

router.post('/apps/:name/instances/:instanceId', (req, res, next) => {
  App.findOne({ where: { name: req.params.name } })
    .then(app => {
      if (!app) {
        next(new ApiError(404, 'Application not found.'))
        return
      }
      Instance
        .create({ instanceId: req.params.instanceId, appName: req.params.name })
        .then(instance => res.status(201).json(instance))
        .catch(err => next(err))
    })
})

module.exports = router
