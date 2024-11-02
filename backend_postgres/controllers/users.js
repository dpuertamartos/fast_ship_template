const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { Blog, User } = require('../models')

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ error: 'Email and password are required' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    email,
    passwordHash,
    role: 'user' // Assigning default role as 'user'
  })

  response.status(201).json(user)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll({ include: { model: Blog, attributes: ['title', 'content'] } })
  response.json(users)
})

module.exports = usersRouter
