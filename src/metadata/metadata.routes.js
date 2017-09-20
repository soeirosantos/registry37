'use strict'

const _ = require('lodash')
const express = require('express')
const router = express.Router()
const Metadata = require('./metadata.model')
const Instance = require('../instances/instance.model')

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
  Instance.findOne({ where: { appName: req.params.name, instanceId: req.params.instanceId } })
    .then(instance => {
      if (!instance) {
        res.sendStatus(404)
        return
      }
      const newMetadata = {}
      let value
      for (let property in req.body) { // TODO: validate the body structure
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
