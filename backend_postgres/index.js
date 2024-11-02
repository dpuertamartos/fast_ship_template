const app = require('./app')
const { connectToDatabase, sequelize } = require('./utils/db')
const config = require('./utils/config')
const logger = require('./utils/logger')
const init = require('./utils/init')
const { setupAssociations } = require('./utils/setupAssociations')

const start = async () => {
  await connectToDatabase()
  await setupAssociations()
  await sequelize.sync()
  logger.info('Database sync completed')
  await init.initializeAdminUser()
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

start()

