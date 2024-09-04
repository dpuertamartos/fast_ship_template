require('dotenv').config()

const PORT = process.env.PORT
const POSTGRES_URI = process.env.NODE_ENV === 'development'
  ? process.env.DEV_POSTGRES_URI
  : process.env.POSTGRES_URI

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

module.exports = {
  POSTGRES_URI,
  PORT,
  ADMIN_EMAIL,
  ADMIN_PASSWORD
}
