const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
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

module.exports = loginRouter
