const logger = require('./logger')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('./config')

const initializeAdminUser = async () => {
  const existingAdmin = await User.findOne({ where: { role: 'admin' } })
  if (!existingAdmin) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(config.ADMIN_PASSWORD, saltRounds)

    await User.create({
      email: config.ADMIN_EMAIL,
      passwordHash,
      role: 'admin',
    })

    logger.info('Admin user created with email:', config.ADMIN_EMAIL)
  } else {
    logger.info('Admin credentials already in place.')
  }
}

module.exports = { initializeAdminUser }
