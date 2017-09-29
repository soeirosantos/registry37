module.exports = {
  'dev': {
    'dialect': 'sqlite',
    'storage': './db.development.sqlite'
  },
  'test': {
    'dialect': 'sqlite',
    'storage': ':memory:',
    'logging': false
  },
  'production': {
    'username': process.env.DB_USERNAME || 'registry37_user',
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME || 'registry37',
    'host': process.env.DB_HOST || 'mysql-registry37',
    'port': process.env.DB_PORT || '3306',
    'dialect': 'mysql',
    'pool': {
      'max': process.env.DB_POOL_MAX || 5,
      'min': process.env.DB_POOL_MIN || 0,
      'idle': process.env.DB_POOL_IDLE || 10000
    },
    'logging': false
  }
}
