'use strict'

const express = require('express')
const router = express.Router()

router.get('/apps/:name/instances/:instanceId/metadata/keys', (req, res, next) => {
  console.log(`instanceId: ${req.params.instanceId}`)
  console.log(`app name: ${req.params.name}`)
  res.status(200).json(['healthCheckUrl', 'homePageUrl', 'hostName'])
})

router.get('/apps/:name/instances/:instanceId/metadata/:keyName', (req, res, next) => {
  console.log(`key name: ${req.params.keyName}`)
  res.status(200).json({healthCheckUrl: 'http://the-url'})
})

router.post('/apps/:name/instances/:instanceId/metadata', (req, res, next) => {
  res.status(201).json({healthCheckUrl: 'http://the-url'})
})

module.exports = router
