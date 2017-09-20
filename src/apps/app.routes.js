'use strict'

const express = require('express')
const expressSanitized = require('express-sanitize-escape')
const router = express.Router()
const App = require('./app.model')
const Instance = require('../instances').model

expressSanitized.sanitizeParams(router, ['name'])

const ApiError = require('../error').ApiError

const MAX_RESULTS_PER_PAGE = 100
const DEFAULT_RESULTS_PER_PAGE = 10
const FIRST_PAGE = 1

router.get('/apps', (req, res, next) => {
  // TODO: this pagination logic could be extracted in case of reuse
  const limit = Math.min(parseInt(req.query['limit'] || DEFAULT_RESULTS_PER_PAGE),
    MAX_RESULTS_PER_PAGE)
  const page = parseInt(req.query['page'] || FIRST_PAGE)
  const offset = (page - 1) * limit
  App.findAndCountAll({ offset: offset, limit: limit })
    .then(apps => res.header('X-Total-Count', apps.count)
      .header('X-Limit', limit)
      .header('X-Page', page)
      .status(200).json(apps.rows))
    .catch(err => next(err))
})

router.get('/apps/:name', (req, res, next) => {
  App.findOne({ where: { name: req.params.name } })
    .then(app => {
      if (!app) {
        next(new ApiError(404, 'Application not found.'))
        return
      }
      Instance.findAll({ where: { appName: app.name } })
        .then(instances => {
          app = app.toJSON()
          app.instances = instances
          res.status(200).json(app)
        })
        .catch(err => next(err))
    })
})

router.post('/apps/:name', (req, res, next) => {
  App
    .create({ name: req.params.name }) // FIXME: security flaw
    .then(app => res.status(201).json(app))
    .catch(err => next(err))
})

module.exports = router
