const logger = require('./logger')

const requestLogger = (request, response, next) => {
  const sanitizedBody = { ...request.body }

  if (sanitizedBody.password) {
    sanitizedBody.password = '***'
  }

  const bodyString = JSON.stringify(sanitizedBody, (key, value) =>
    typeof value === 'object' && value !== null ? value : String(value)
  )
  logger.info(`Method: ${request.method}; Path: ${request.path}; Body: ${bodyString}`)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('error:', error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })  // Update this to 401
  } else if (error.name === 'TokenExpiredError') { // Handle expired token
    return response.status(401).json({ error: 'token expired' })  // Respond with 401 if the token has expired
  }

  next(error)
}


module.exports = { requestLogger, unknownEndpoint, errorHandler }