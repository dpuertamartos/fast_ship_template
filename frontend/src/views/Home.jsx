import { useState, useEffect, useRef } from 'react'
import { Grid, Box, Typography, Button, TextField } from '@mui/material'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { useAuth } from '../context/AuthContext' // Import useAuth hook
import ExtraDrawer from '../components/common/ExtraDrawer'
import Togglable from '../components/common/Togglable'

const Home = ({ theme, isLargeScreen, handleDrawerToggle, drawerOpen, setErrorMessage }) => {
  const { user } = useAuth() // Destructure token from AuthContext
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const blogFormRef = useRef()

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlog({ title: '', content: '', author: '' })
    } catch (error) {
      console.error('Failed to add blog', error)
      setErrorMessage(
        'Failed to add blog'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addComment = async (blogId) => {
    try {
      const savedComment = await commentService.create({ content: newComment, blogId })
      setBlogs(blogs.map(blog => blog.id === blogId ? { ...blog, comments: blog.comments.concat(savedComment) } : blog))
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment', error)
      setErrorMessage(
        'Failed to add comment'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Box>
      <Grid>
        {!isLargeScreen &&
        <ExtraDrawer
          theme={theme}
          handleDrawerToggle={handleDrawerToggle}
          drawerOpen={drawerOpen}
          drawerContent={
            <Typography variant="h6" component="div">
            Hello Drawer!
            </Typography>
          }
        />}
      </Grid>
      <Typography variant="h4">Blogs</Typography>
      {user && user.role === 'admin' && <div>
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <form onSubmit={addBlog}>
            <TextField label="Title" name="title" value={newBlog.title} onChange={handleChange} fullWidth />
            <TextField label="Content" name="content" value={newBlog.content} onChange={handleChange} fullWidth multiline rows={4} />
            <TextField label="Author" name="author" value={newBlog.author} onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Add Blog</Button>
          </form>
        </Togglable>
      </div>}
      {blogs.map(blog => (
        <Box key={blog.id} mt={2}>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="body1">{blog.content}</Typography>
          <Typography variant="body2">By {blog.author}</Typography>
          <Typography variant="subtitle2" mt={2}>Comments:</Typography>
          {blog.comments.map(comment => (
            <Box key={comment.id} ml={2}>
              <Typography variant="body2">{comment.content}</Typography>
            </Box>
          ))}
          {user && (
            <Box mt={2}>
              <TextField
                label="New Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
              />
              <Button onClick={() => addComment(blog.id)} variant="outlined" color="primary">Add Comment</Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Home
