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
      { model: User, attributes: ['id', 'email'] }, // Include the blog's author
      { model: Comment,
        attributes: ['id', 'content', 'date'],
        include: [
          { model: User, attributes: ['id', 'email'] } // Include user info for each comment
        ]
      }
    ]
  })

  // Transform the data to match the expected format
  const transformedBlogs = blogs.map(blog => ({
    id: blog.id, // Transform id to _id
    title: blog.title,
    content: blog.content,
    author: blog.author,
    date: blog.date,
    user: blog.User ? { id: blog.User.id, email: blog.User.email } : null, // Nest user information
    comments: blog.Comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      date: comment.date,
      user: comment.User ? { id: comment.User.id, email: comment.User.email } : null // Nest user information in comments
    }))
  }))

  response.json(transformedBlogs)
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findByPk(request.params.id, {
    include: [
      { model: User, attributes: ['id', 'email'] }, // Include the blog's author
      { model: Comment,
        attributes: ['id', 'content', 'date'],
        include: [
          { model: User, attributes: ['id', 'email'] } // Include user info for each comment
        ]
      }
    ]
  })

  if (blog) {
    const transformedBlog = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      user: blog.User ? { id: blog.User.id, email: blog.User.email } : null,
      comments: blog.Comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        date: comment.date,
        user: comment.User ? { id: comment.User.id, email: comment.User.email } : null // Nest user information in comments
      }))
    }
    response.json(transformedBlog)
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

  // Transform the created blog data to match MongoDB format
  const transformedBlog = {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
    date: blog.date,
    user: { id: user.id, email: user.email },
    comments: []
  }

  response.status(201).json(transformedBlog)
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

  const blog = await Blog.findByPk(request.params.id, {
    include: [
      { model: User, attributes: ['id', 'email'] },
      { model: Comment, attributes: ['id', 'content', 'date', 'userId'] }
    ]
  })

  if (blog) {
    blog.title = title
    blog.content = content
    blog.author = author
    await blog.save()

    // Transform the updated blog data to match MongoDB format
    const transformedBlog = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      user: blog.User ? { id: blog.User.id, email: blog.User.email } : null,
      comments: blog.Comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        date: comment.date,
        userId: comment.userId
      }))
    }

    response.json(transformedBlog)
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
