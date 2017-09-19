'use strict'

const express = require('express')
const router = express.Router()

router.get('/apps', (req, res, next) => {
  res.status(200).json([{name: 'foo'}, {name: 'bar'}, {name: 'baz'}])
})

router.get('/apps/:name', (req, res, next) => {
  console.log(`app name: ${req.params.name}`)
  res.status(200).json({name: 'foo', instances: [{instanceId: 'someInstance'}]})
})

router.post('/apps/:name', (req, res, next) => {
  res.status(201).json({name: 'foo'})
})

module.exports = router
