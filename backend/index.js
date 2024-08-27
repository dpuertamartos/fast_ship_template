const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

if (config.DB_TYPE === 'postgres') {
  const sequelize = require('./utils/sequelize')
  sequelize.sync()  // Sync Sequelize models with PostgreSQL
    .then(() => {
      logger.info('Database synchronized')
      app.listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`)
      })
    })
    .catch(error => {
      logger.error('Error synchronizing the database:', error.message)
    })
} else {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}
