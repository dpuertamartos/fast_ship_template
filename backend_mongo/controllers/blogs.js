const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { email: 1 })

  response.json(blogs)
})

// Get a specific blog post by ID
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { email: 1 })

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

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can create blogs' })
  }

  const blog = new Blog({
    title: body.title,
    content: body.content,
    author: body.author,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

/// Update an existing blog (only for admins)
blogsRouter.put('/:id', async (request, response) => {
  const { title, content, author } = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can update blogs' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, content, author },
    { new: true, runValidators: true, context: 'query' })
    .populate('user', { email: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

// Delete a blog (only for admins)
blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'admin') {
    return response.status(403).json({ error: 'only admins can delete blogs' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  await Blog.deleteOne({ _id: blogToDelete._id })
  response.status(204).end()
})


module.exports = blogsRouter
