const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../../models/postgres/note')
const User = require('../../models/postgres/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const notes = await Note.findAll({ include: { model: User, attributes: ['email'] } })
  response.json(notes)
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const updatedNote = await Note.update(
      { content: body.content, important: body.important },
      { where: { id: request.params.id }, returning: true }
    )
    response.json(updatedNote[1][0])
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findByPk(decodedToken.id)

  const note = await Note.create({
    content: body.content,
    important: body.important || false,
    userId: user.id
  })

  response.status(201).json(note)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findByPk(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.destroy({ where: { id: request.params.id } })
  response.status(204).end()
})

module.exports = notesRouter
