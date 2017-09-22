const Redis = require('ioredis')
const config = require('./config')[process.env.NODE_ENV || 'dev']
const subscriber = new Redis(config.uri, {lazyConnect: true, dropBufferSupport: true})

// When a client starts it should use `GET  /apps/:appName/instances/:instanceId/metadata/keys`
// to load all the metadata from redis. 
// The endpoint `GET  /apps/:appName/instances/:instanceId` can also be used to get all metadata
// at once.
// After that, all updates and new properties will be notified to the instance channel

const appName = 'foo'
const instanceId = 'instance1'

subscriber.subscribe(`${appName}:${instanceId}`)

subscriber.on('message', (channel, metadata) => {
  console.log(metadata)
  // Object.assign(myConfiguration, metadata)
  // ^ Example on how to update the client's config
})
