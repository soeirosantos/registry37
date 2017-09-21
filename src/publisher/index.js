'use strict'

const Redis = require('ioredis')
const config = require('./config')[process.env.NODE_ENV || 'dev']
console.log('Connecting to Redis at: %s', config.uri)
const redis = new Redis(config.uri, { lazyConnect: true, dropBufferSupport: true })

function publishMetadata (instance, metadata) {
  redis.set(metadata.getNamespace(), metadata.value)
  return redis.publish(instance.getNamespace(), metadata.getNamespace())
}

module.exports = { publishMetadata: publishMetadata }
