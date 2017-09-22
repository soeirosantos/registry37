'use strict'

const Redis = require('ioredis')
const config = require('./config')[process.env.NODE_ENV || 'dev']
const redis = new Redis(config.uri, { lazyConnect: true, dropBufferSupport: true })

function publishMetadata (instance, metadata) {
  // TODO: having this data duplicated in Redis and in the Rest API could bring
  // eventual inconsistencies. Should we notify and the update be gotten by the API?
  redis.set(metadata.getNamespace(), metadata.value)
  return redis.publish(instance.getNamespace(), metadata.getNamespace())
}

module.exports = { publishMetadata: publishMetadata }
