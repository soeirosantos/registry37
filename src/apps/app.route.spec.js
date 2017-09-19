/* eslint-disable no-unused-vars,handle-callback-err */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

const should = chai.should()
chai.use(chaiHttp)

describe('Apps API', () => {
  describe('GET /api/v1/apps', () => {
    it('should response HTTP status 200 retrieving all apps', (done) => {
      chai.request(server)
        .get('/api/v1/apps')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('GET /api/v1/apps/:name', () => {
    it('should response HTTP status 200 retrieving an app by name', (done) => {
      chai.request(server)
        .get('/api/v1/apps/foo')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  describe('POST /api/v1/apps/:name', () => {
    it('should response HTTP status 201 creating an app', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo')
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.name.should.equal('foo')
          done()
        })
    })
  })
})
