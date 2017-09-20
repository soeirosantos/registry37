/* eslint-disable no-unused-vars,handle-callback-err */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

const should = chai.should()
chai.use(chaiHttp)

describe('Metadata API', () => {
  describe('GET /api/v1/apps/:name/intances/:instanceId/metadata/:keyName', () => {
    it('should response HTTP status 200 retrieving a metadata', (done) => {
      chai.request(server)
        .get('/api/v1/apps/foo/instances/instance1/metadata/someKey')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('someKey')
          done()
        })
    })
  })

  describe('GET /api/v1/apps/:name/intances/:instanceId/metadata/keys', () => {
    it('should response HTTP status 200 retrieving all keys for an instance', (done) => {
      chai.request(server)
        .get('/api/v1/apps/foo/instances/instance1/metadata/keys')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('POST /api/v1/apps/:name/intances/:instanceId/metadata', () => {
    it('should response HTTP status 201 storing a metadata', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo/instances/theInstanceId/metadata')
        .send({healthCheckUrl: 'http://the-url'})
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('healthCheckUrl')
          done()
        })
    })
  })
})
