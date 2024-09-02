const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const init = require('./utils/init')
const sequelize = require('./utils/sequelize')
const setupAssociations = require('./utils/setupAssociations') 

setupAssociations()  // Setup model associations

sequelize.sync()  // Sync Sequelize models with PostgreSQL
  .then(async () => {
    logger.info('Database synchronized')
    await init.initializeAdminUser()
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  })
  .catch(error => {
    logger.error('Error synchronizing the database:', error.message)
  })

