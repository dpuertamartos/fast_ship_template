const blogsRouter = require('express').Router()
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

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll({
    include: [
      { model: User, attributes: ['email'] },
      { model: Comment, attributes: ['content', 'date'] }
    ]
  })
  console.log(blogs)
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findByPk(request.params.id, {
    include: [
      { model: User, attributes: ['email'] },
      { model: Comment, attributes: ['content', 'date', 'userId'] }
    ]
  })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json({ error: 'blog not found' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findByPk(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can create blogs' })
  }

  const blog = await Blog.create({
    title: body.title,
    content: body.content,
    author: body.author,
    userId: user.id,
  })

  response.status(201).json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, content, author } = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findByPk(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can update blogs' })
  }

  const blog = await Blog.findByPk(request.params.id)
  if (blog) {
    blog.title = title
    blog.content = content
    blog.author = author
    await blog.save()
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findByPk(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can delete blogs' })
  }

  const blog = await Blog.findByPk(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  await blog.destroy()
  response.status(204).end()
})

module.exports = blogsRouter
