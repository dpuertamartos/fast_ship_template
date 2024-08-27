const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../../models/postgres/user')
const Note = require('../../models/postgres/note')

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
  })

  response.status(201).json(user)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll({ include: { model: Note, attributes: ['content', 'important'] } })
  response.json(users)
})

module.exports = usersRouter
