const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ error: 'Email and password are required' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    passwordHash,
    role: 'user' // Assigning default role as 'user'
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, content: 1 })
  response.json(users)
})

module.exports = usersRouter
