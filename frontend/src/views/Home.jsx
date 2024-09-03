import { useState, useEffect, useRef } from 'react'
import { Grid, Box, Typography, Button, TextField, Modal } from '@mui/material'
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
  const [editingBlog, setEditingBlog] = useState(null) // State for editing a blog
  const [editingComment, setEditingComment] = useState(null) // State for editing a comment
  const [editModalOpen, setEditModalOpen] = useState(false) // State for blog edit modal open/close
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false) // State for comment edit modal open/close

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const blogFormRef = useRef()

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditingBlog({ ...editingBlog, [name]: value })
  }

  const handleCommentEditChange = (event) => {
    const { value } = event.target
    setEditingComment({ ...editingComment, content: value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlog({ title: '', content: '', author: '' })
    } catch (error) {
      console.error('Failed to add blog', error)
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addComment = async (blogId) => {
    try {
      const savedComment = await commentService.create({ content: newComment, blogId })

      // Fetch the updated blog data from the server
      const updatedBlog = await blogService.get(blogId)

      setBlogs(blogs.map(blog => blog.id === blogId ? updatedBlog : blog))
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment', error)
      setErrorMessage('Failed to add comment')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (error) {
        console.error('Failed to delete blog post', error)
        setErrorMessage('Failed to delete blog post')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setEditModalOpen(true)
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await blogService.update(editingBlog.id, {
        title: editingBlog.title,
        content: editingBlog.content,
        author: editingBlog.author,
      })
      setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
      setEditModalOpen(false)
    } catch (error) {
      console.error('Failed to update blog post', error)
      setErrorMessage('Failed to update blog post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteComment = async (blogId, commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.remove(commentId)
        setBlogs(blogs.map(blog =>
          blog.id === blogId ? { ...blog, comments: blog.comments.filter(comment => comment.id !== commentId) } : blog
        ))
      } catch (error) {
        console.error('Failed to delete comment', error)
        setErrorMessage('Failed to delete comment')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleEditComment = (blogId, comment) => {
    setEditingComment({ ...comment, blogId }) // Include blogId in the editingComment state
    setEditCommentModalOpen(true)
  }

  const handleUpdateComment = async (event) => {
    event.preventDefault()
    try {
      const updatedComment = await commentService.update(editingComment.id, {
        content: editingComment.content,
      })

      // Fetch the updated blog data from the server using the correct blogId
      const updatedBlog = await blogService.get(editingComment.blogId)

      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      setEditCommentModalOpen(false)
    } catch (error) {
      console.error('Failed to update comment', error)
      setErrorMessage('Failed to update comment')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setEditingBlog(null)
  }

  const handleCloseEditCommentModal = () => {
    setEditCommentModalOpen(false)
    setEditingComment(null)
  }

  console.log(blogs)

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
      {user && user.role === 'admin' && (
        <div>
          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <form onSubmit={addBlog}>
              <TextField label="Title" name="title" value={newBlog.title} onChange={handleChange} fullWidth />
              <TextField label="Content" name="content" value={newBlog.content} onChange={handleChange} fullWidth multiline rows={4} />
              <TextField label="Author" name="author" value={newBlog.author} onChange={handleChange} fullWidth />
              <Button type="submit" variant="contained" color="primary">Add Blog</Button>
            </form>
          </Togglable>
        </div>
      )}
      {blogs.map(blog => (
        <Box key={blog.id} mt={2}>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="body1">{blog.content}</Typography>
          <Typography variant="body2">By {blog.author}</Typography>
          <Typography variant="subtitle2" mt={2}>Comments:</Typography>
          {blog.comments.map(comment => (
            <Box key={comment.id} ml={2}>
              <Typography variant="body2">{comment.content}</Typography>
              <Typography variant="caption">By {comment.user.email}</Typography>
              {(user && (user.role === 'admin' || comment.user.email === user.email)) && (
                <Box mt={1}>
                  <Button variant="outlined" color="primary" onClick={() => handleEditComment(blog.id, comment)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteComment(blog.id, comment.id)}>Delete</Button>
                </Box>
              )}
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
          {user && user.role === 'admin' && (
            <Box mt={2}>
              <Button variant="outlined" color="primary" onClick={() => handleEdit(blog)}>Edit</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(blog.id)}>Delete</Button>
            </Box>
          )}
        </Box>
      ))}

      {/* Modal for editing a blog */}
      {editingBlog && (
        <Modal open={editModalOpen} onClose={handleCloseEditModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}>
            <Typography variant="h6" mb={2}>Edit Blog</Typography>
            <form onSubmit={handleUpdate}>
              <TextField label="Title" name="title" value={editingBlog.title} onChange={handleEditChange} fullWidth margin="normal" />
              <TextField label="Content" name="content" value={editingBlog.content} onChange={handleEditChange} fullWidth multiline rows={4} margin="normal" />
              <TextField label="Author" name="author" value={editingBlog.author} onChange={handleEditChange} fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
            </form>
          </Box>
        </Modal>
      )}

      {/* Modal for editing a comment */}
      {editingComment && (
        <Modal open={editCommentModalOpen} onClose={handleCloseEditCommentModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}>
            <Typography variant="h6" mb={2}>Edit Comment</Typography>
            <form onSubmit={handleUpdateComment}>
              <TextField
                label="Content"
                name="content"
                value={editingComment.content}
                onChange={handleCommentEditChange}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
            </form>
          </Box>
        </Modal>
      )}
    </Box>
  )
}

export default Home
