require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'development'
    ? process.env.DEV_MONGODB_URI
    : process.env.MONGODB_URI

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

module.exports = {
  MONGODB_URI,
  PORT,
  ADMIN_EMAIL,
  ADMIN_PASSWORD
}
