'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const expressSanitized = require('express-sanitize-escape')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(expressSanitized.middleware())

const API_ROOT = '/api/v1'

app.use(`${API_ROOT}/health`, require('./infra/health'))
app.use(API_ROOT, require('./apps').routes)
app.use(API_ROOT, require('./instances').routes)
app.use(API_ROOT, require('./metadata').routes)
app.disable('x-powered-by')

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Sorry, we are facing issues...')
})

const sequelize = require('./infra/db')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})

module.exports = app
