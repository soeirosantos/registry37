'use strict'

const express = require('express')
const router = express.Router()

router.get('/:keyName', (req, res, next) => {
  console.log(`key name: ${req.params.keyName}`)
  res.status(200).json({healthCheckUrl: 'http://the-url'})
})

router.get('/keys', (req, res, next) => {
  console.log(`instanceId: ${req.params.instanceId}`)
  res.status(200).json(['healthCheckUrl', 'homePageUrl', 'hostName'])
})

router.post('/', (req, res, next) => {
  res.status(201).json({healthCheckUrl: 'http://the-url'})
})

module.exports = router
