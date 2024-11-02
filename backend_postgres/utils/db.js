const { Sequelize } = require('sequelize')
const config = require('./config')
const logger = require('./logger')

let sequelize = new Sequelize(config.POSTGRES_URI, {
  dialect: 'postgres',
  pool: {
    max: 60,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: (msg) => logger.info(msg),
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()

    console.log('Database connected')
  } catch (err) {
    console.log('Connecting database failed')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }