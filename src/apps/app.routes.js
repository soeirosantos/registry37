'use strict'

const express = require('express')
const router = express.Router()
const App = require('./app.model')
const Instance = require('../instances').model

router.get('/apps', (req, res, next) => {
  App.findAll()
    .then(apps => res.status(200).json(apps))
    .catch(err => next(err))
})

router.get('/apps/:name', (req, res, next) => {
  App.findOne({ where: { name: req.params.name } })
    .then(app => {
      if (!app) {
        res.sendStatus(404)
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
