const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findByPk(request.params.id, {
    include: [
      { model: User, attributes: ['email'] },
      { model: Blog, attributes: ['title', 'author'] }
    ]
  })

  if (comment) {
    response.json(comment)
  } else {
    response.status(404).json({ error: 'comment not found' })
  }
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const comment = await Comment.create({
    content: body.content,
    blogId: body.blogId,
    userId: decodedToken.id,
  })

  response.status(201).json(comment)
})

commentsRouter.get('/all/:blogId', async (request, response) => {
  const comments = await Comment.findAll({ where: { blogId: request.params.blogId } })
  response.json(comments)
})

commentsRouter.put('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const comment = await Comment.findByPk(request.params.id)
  if (!comment) {
    return response.status(404).json({ error: 'comment not found' })
  }

  const user = await User.findByPk(decodedToken.id)

  if (comment.userId !== user.id && user.role !== 'admin') {
    return response.status(403).json({ error: 'only the creator or an admin can update comments' })
  }

  comment.content = request.body.content
  await comment.save()

  response.json(comment)
})

commentsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const comment = await Comment.findByPk(request.params.id)
  if (!comment) {
    return response.status(404).json({ error: 'comment not found' })
  }

  const user = await User.findByPk(decodedToken.id)

  if (comment.userId !== user.id && user.role !== 'admin') {
    return response.status(403).json({ error: 'only the creator or an admin can delete comments' })
  }

  await comment.destroy()
  response.status(204).end()
})

module.exports = commentsRouter
