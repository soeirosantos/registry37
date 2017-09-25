/* eslint-disable no-unused-vars,handle-callback-err,no-unused-expressions */

'use strict'

const sinon = require('sinon')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const publisher = require('../publisher')

const should = chai.should()
chai.use(chaiHttp)

describe('Metadata API', () => {
  before

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
    it('should response HTTP status 404 retrieving for a non-existing key', (done) => {
      chai.request(server)
        .get('/api/v1/apps/foo/instances/instance1/metadata/test')
        .end((err, res) => {
          res.should.have.status(404)
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
    it('should response HTTP status 404 retrieving for a non-existing app/instanceId', (done) => {
      chai.request(server)
        .get('/api/v1/apps/test/instances/instance1/metadata/test')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('POST /api/v1/apps/:name/intances/:instanceId/metadata', () => {
    sinon.stub(publisher, 'publishMetadata').resolves()
    it('should response HTTP status 200 updating a metadata', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo/instances/theInstanceId/metadata')
        .send({ healthCheckUrl: 'http://the-url' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('healthCheckUrl')
          done()
        })
    })
    it('should response HTTP status 200 creating a metadata', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo/instances/theInstanceId/metadata')
        .send({ s3ApiKey: '128381' })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('s3ApiKey')
          done()
        })
    })
    it('should response HTTP status 400 storing a metadata with wrong content', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo/instances/theInstanceId/metadata')
        .send({})
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
    it('should response HTTP status 404 storing a metadata for a non-existing instance', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo/instances/test/metadata')
        .send({ healthCheckUrl: 'http://the-url' })
        .send({})
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})
