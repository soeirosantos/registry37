'use strict'

const Redis = require('ioredis')
const config = require('./config')[process.env.NODE_ENV || 'dev']
const redis = new Redis(config.uri, { lazyConnect: true, dropBufferSupport: true })

function publishMetadata (instance, metadata) {
  return redis.publish(instance.getNamespace(), JSON.stringify(metadata))
}

module.exports = { publishMetadata: publishMetadata }
