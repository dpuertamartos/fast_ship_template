const { Sequelize } = require('sequelize')
const config = require('./config')
const logger = require('./logger')

let sequelize = new Sequelize(config.POSTGRES_URI, {
  dialect: 'postgres',
  logging: (msg) => logger.info(msg),
})

module.exports = sequelize
