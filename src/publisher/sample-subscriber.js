const Redis = require('ioredis')
const config = require('./config')[process.env.NODE_ENV || 'dev']
const subscriber = new Redis(config.uri, {lazyConnect: true, dropBufferSupport: true})
const redis = new Redis(config.uri, {lazyConnect: true, dropBufferSupport: true})

// When a client starts it should use `GET  /apps/:appName/instances/:instanceId/metadata/keys`
// to load all the metadata from redis. 
// The endpoint `GET  /apps/:appName/instances/:instanceId` can also be used to get all metadata
// at once.
// After that, all updates and new properties will be notified to the instance channel

subscriber.subscribe('foo:instance1')

subscriber.on('message', (channel, metadataKey) => {
  console.log('Got update for ' + channel)
  redis.get(metadataKey, (err, result) => {
    if (err) throw err
    console.log(result)
  })
})
