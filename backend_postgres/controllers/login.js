const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')

const TOKEN_EXPIRATION = 4 * 60 * 60

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ where: { email } })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    email: user.email,
    role: user.role,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: TOKEN_EXPIRATION })

  response.status(200).send({ token, email: user.email, role: user.role })
})

loginRouter.post('/google', async (req, res) => {
  const { code, redirectUri } = req.body
  const ALLOWED_REDIRECT_URIS = [
    `http://${config.DOMINIO}/auth/google/callback`,
    `https://${config.DOMINIO}/auth/google/callback`,
  ]

  // Validate the redirect URI
  if (!ALLOWED_REDIRECT_URIS.includes(redirectUri)) {
    return res.status(400).send({ error: 'Invalid redirect URI' })
  }

  try {
    // Create a new URLSearchParams object for form data
    const params = new URLSearchParams({
      code: code,
      client_id: config.GOOGLE_CLIENT_ID,
      client_secret: config.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    })

    // Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const { id_token } = tokenResponse.data
    // Decode ID token to get user info
    const userInfo = jwt.decode(id_token)
    const { email } = userInfo
    console.log('User info received from Google:', email)

    // Find or create user in your database
    let user = await User.findOne({ where: { email } })
    if (!user) {
      user = await User.create({ email })
    }

    // Generate your own JWT token
    const userForToken = { email: user.email, id: user.id }
    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, email: user.email })
  } catch (error) {
    console.error(
      'Error during Google login:',
      error.response ? error.response.data : error.message
    )
    res.status(401).send({ error: 'Invalid authorization code' })
  }
})

module.exports = loginRouter
