const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

let notesRouter, usersRouter, loginRouter, testingRouter

if (config.DB_TYPE === 'mongodb') {
  const mongoose = require('mongoose')
  mongoose.set('strictQuery', false)

  logger.info('connecting to', config.MONGODB_URI)

  mongoose.connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })

  notesRouter = require('./controllers/mongodb/notes')
  usersRouter = require('./controllers/mongodb/users')
  loginRouter = require('./controllers/mongodb/login')

  if (process.env.NODE_ENV === 'test') {
    testingRouter = require('./controllers/mongodb/testing')
  }

} else if (config.DB_TYPE === 'postgres') {
  const sequelize = require('./utils/sequelize')

  sequelize.authenticate()
    .then(() => {
      logger.info('connected to PostgreSQL')
    })
    .catch((error) => {
      logger.error('error connecting to PostgreSQL:', error.message)
    })

  notesRouter = require('./controllers/postgres/notes')
  usersRouter = require('./controllers/postgres/users')
  loginRouter = require('./controllers/postgres/login')

  if (process.env.NODE_ENV === 'test') {
    testingRouter = require('./controllers/postgres/testing')
  }
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (testingRouter) {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
