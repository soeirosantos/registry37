/* eslint-disable no-unused-vars,handle-callback-err */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

const should = chai.should()
chai.use(chaiHttp)

describe('Instances API', () => {
  describe('GET /api/v1/apps/:name/intances/:instanceId', () => {
    it('should response HTTP status 200 retrieving metadata for an instance', (done) => {
      chai.request(server)
        .get('/api/v1/apps/foo/instances/theInstanceId')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('metadata')
          res.body.metadata.should.be.a('array')
          done()
        })
    })
  })

  describe('POST /api/v1/apps/:name/intances/:instanceId', () => {
    it('should response HTTP status 201 creating an instance', (done) => {
      chai.request(server)
        .post('/api/v1/apps/foo/instances/theInstanceId')
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.instanceId.should.be.equal('theInstanceId')
          done()
        })
    })
  })
})
