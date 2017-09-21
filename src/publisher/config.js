module.exports = {
  'dev': {
    'uri': 'redis://localhost:6379/4'
  },
  'test': {
    'uri': 'redis://localhost:6379/4'
  },
  'prod': {
    'uri': process.env.REDIS_URI
  }
}
