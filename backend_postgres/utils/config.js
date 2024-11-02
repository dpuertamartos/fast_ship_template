require('dotenv').config()

const PORT = process.env.PORT
const POSTGRES_URI = process.env.NODE_ENV === 'development'
  ? process.env.DEV_POSTGRES_URI
  : process.env.POSTGRES_URI

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const DOMINIO = process.env.DOMINIO ? process.env.DOMINIO : 'localhost:5173'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

module.exports = {
  POSTGRES_URI,
  PORT,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  DOMINIO,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
}
