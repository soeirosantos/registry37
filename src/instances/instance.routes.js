'use strict'

const express = require('express')
const router = express.Router()

router.get('/:instanceId', (req, res, next) => {
  console.log(`instanceId: ${req.params.instanceId}`)
  res.status(200).json({instanceId: 'theInstanceId', metadata: [{healthCheckUrl: 'http://the-url'}]})
})

router.post('/', (req, res, next) => {
  res.status(201).json({instanceId: 'theInstanceId'})
})

module.exports = router
