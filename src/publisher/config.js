module.exports = {
  'dev': {
    'uri': 'redis://localhost:6379/4'
  },
  'test': {
    'uri': 'redis://localhost:6379/4'
  },
  'production': {
    'uri': process.env.REDIS_URI || 'redis://redis-registry37:6379/4'
  }
}
