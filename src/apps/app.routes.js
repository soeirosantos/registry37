'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json([{name: 'foo'}, {name: 'bar'}, {name: 'baz'}])
})

router.get('/:name', (req, res, next) => {
  console.log(`app name: ${req.params.name}`)
  res.status(200).json({name: 'foo', instances: [{instanceId: 'someInstance'}]})
})

router.post('/:name', (req, res, next) => {
  res.status(201).json({name: 'foo'})
})

module.exports = router
