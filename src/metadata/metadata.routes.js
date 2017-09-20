'use strict'

const _ = require('lodash')
const express = require('express')
const expressSanitized = require('express-sanitize-escape')
const router = express.Router()
const Metadata = require('./metadata.model')
const Instance = require('../instances/instance.model')
const ApiError = require('../error/errorHandler').ApiError

expressSanitized.sanitizeParams(router, ['name', 'instanceId', 'keyName'])

router.get('/apps/:name/instances/:instanceId/metadata/keys', (req, res, next) => {
  Metadata.findAll({ where: { instanceId: req.params.instanceId, appName: req.params.name } })
    .then(metadata => {
      metadata = _.map(metadata, (m) => m.key)
      res.status(200).json(metadata)
    })
    .catch(err => next(err))
})

router.get('/apps/:name/instances/:instanceId/metadata/:keyName', (req, res, next) => {
  Metadata.findOne({
    where: {instanceId: req.params.instanceId, appName: req.params.name, key: req.params.keyName}
  })
    .then(metadata => {
      const keyValuePair = {}
      keyValuePair[metadata.key] = metadata.value
      res.status(200).json(keyValuePair)
    })
    .catch(err => next(err))
})

router.post('/apps/:name/instances/:instanceId/metadata', (req, res, next) => {
  if (_.size(req.body) !== 1) {
    next(new ApiError(400, 'Wrong format for the metadata. Please, use {"key":"value"}.'))
    return
  }

  Instance.findOne({ where: { appName: req.params.name, instanceId: req.params.instanceId } })
    .then(instance => {
      if (!instance) {
        next(new ApiError(404, 'Application Instance not found.'))
        return
      }
      const newMetadata = {}
      let value
      for (let property in req.body) {
        newMetadata['key'] = property
        value = req.body[property]
      }
      newMetadata['appName'] = instance.appName
      newMetadata['instanceId'] = instance.instanceId
      Metadata.findOrCreate({where: newMetadata, defaults: {value: value}})
        .spread((metadata, created) => {
          if (!created) {
            metadata.value = value
            metadata.save()
          }
          const keyValuePair = {}
          keyValuePair[metadata.key] = metadata.value
          res.status(201).json(keyValuePair)
        })
        .catch(err => next(err))
    })
})

module.exports = router
