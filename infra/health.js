'use strict'

const express = require('express')
const router = express.Router()

router.get('/health', (req, res, next) => {
  res.json({status: 'OK!'})
})

module.exports = router
