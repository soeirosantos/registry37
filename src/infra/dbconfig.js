module.exports = {
  'dev': {
    'dialect': 'sqlite',
    'storage': './db.development.sqlite'
  },
  'test': {
    'dialect': 'sqlite',
    'storage': ':memory:'
  },
  'prod': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'dialect': 'mysql',
    'pool': {
      'max': process.env.DB_POOL_MAX || 5,
      'min': process.env.DB_POOL_MIN || 0,
      'idle': process.env.DB_POOL_IDLE || 10000
    }
  }
}
