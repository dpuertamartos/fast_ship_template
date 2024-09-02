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
            { model: User, attributes: ['id', 'email'] },
            { model: Blog, attributes: ['id', 'title', 'author'] }
        ]
    })

    if (comment) {
        const transformedComment = {
            id: comment.id,
            content: comment.content,
            date: comment.date,
            user: comment.User ? { id: comment.User.id, email: comment.User.email } : null,
            blog: comment.Blog ? { id: comment.Blog.id, title: comment.Blog.title, author: comment.Blog.author } : null
        }
        response.json(transformedComment)
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

    // Fetch the user to include in the response
    const user = await User.findByPk(decodedToken.id, { attributes: ['id', 'email'] })

    const transformedComment = {
        id: comment.id,
        content: comment.content,
        date: comment.date,
        user: user ? { id: user.id, email: user.email } : null,
        blogId: comment.blogId
    }

    response.status(201).json(transformedComment)
})



commentsRouter.get('/all/:blogId', async (request, response) => {
    const comments = await Comment.findAll({
        where: { blogId: request.params.blogId },
        include: [{ model: User, attributes: ['id', 'email'] }]
    })

    const transformedComments = comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        date: comment.date,
        user: comment.User ? { id: comment.User.id, email: comment.User.email } : null,
        blogId: comment.blogId
    }))

    response.json(transformedComments)
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

    // Transform the updated comment data to match MongoDB format
    const transformedComment = {
        id: comment.id,
        content: comment.content,
        date: comment.date,
        userId: comment.userId,
        blogId: comment.blogId
    }

    response.json(transformedComment)
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
