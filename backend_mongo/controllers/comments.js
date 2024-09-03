const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const User = require('../models/user') // Import User model
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Get a specific comment by ID
commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findById(request.params.id)
    .populate('user', { email: 1 })
    .populate('blog', { title: 1, author: 1 })

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

  const comment = new Comment({
    content: body.content,
    blog: body.blogId,
    user: decodedToken.id,
  })

  const savedComment = await comment.save()
  const blog = await Blog.findById(body.blogId)
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

// Get all comments for a specific blog
commentsRouter.get('/all/:blogId', async (request, response) => {
  const blog = await Blog.findById(request.params.blogId).populate('comments', { content: 1, date: 1, user: 1 })

  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).json({ error: 'blog not found' })
  }
})

// Update a comment (only by the comment's creator or an admin)
commentsRouter.put('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const commentToUpdate = await Comment.findById(request.params.id)
  if (!commentToUpdate) {
    return response.status(404).json({ error: 'comment not found' })
  }

  const user = await User.findById(decodedToken.id)

  if (commentToUpdate.user.toString() !== user.id && user.role !== 'admin') {
    return response.status(403).json({ error: 'only the creator or an admin can update comments' })
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    request.params.id,
    { content: request.body.content },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedComment)
})

// Delete a comment (only by the comment's creator or an admin)
commentsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const commentToDelete = await Comment.findById(request.params.id)
  if (!commentToDelete) {
    return response.status(404).json({ error: 'comment not found' })
  }

  const user = await User.findById(decodedToken.id)

  if (commentToDelete.user.toString() !== user.id && user.role !== 'admin') {
    return response.status(403).json({ error: 'only the creator or an admin can delete comments' })
  }

  await Comment.deleteOne({ _id: commentToDelete._id })
  response.status(204).end()
})

module.exports = commentsRouter
