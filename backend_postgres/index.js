const app = require('./app')
const { connectToDatabase } = require('./utils/db')
const config = require('./utils/config')
const logger = require('./utils/logger')
const init = require('./utils/init')
const { syncModels, setupAssociations } = require('./models')

const start = async () => {
  await connectToDatabase()
  await setupAssociations()
  await syncModels()
  await init.initializeAdminUser()
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

start()

