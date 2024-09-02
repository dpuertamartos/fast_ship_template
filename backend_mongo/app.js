const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const init = require('./utils/init')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const blogsRouter = require('./controllers/blogs')
const commentsRouter = require('./controllers/comments')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    init.initializeAdminUser()  // Initialize admin user after connecting to the database

  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/comments', commentsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
