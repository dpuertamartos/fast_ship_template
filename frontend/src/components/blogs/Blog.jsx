import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import EditBlogModal from './EditBlogModal'
import blogService from '../../services/blogs'
import CommentList from '../comments/CommentList'
import Togglable from '../common/Togglable'

const Blog = ({ blog, user, setBlogs, setNotification }) => {
  const [editingBlog, setEditingBlog] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setEditModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.remove(id)
        setBlogs((blogs) => blogs.filter((b) => b.id !== id))
      } catch (error) {
        console.error('Failed to delete blog post', error)
        setNotification('Failed to delete blog post', 'error')
      }
    }
  }


  return (
    <Box mt={2}>
      <Typography variant="h5">{blog.title}</Typography>
      <Typography variant="body1">{blog.content}</Typography>
      <Typography variant="body2">By {blog.author}</Typography>

      {/* Toggle to display comments */}
      <Togglable buttonLabel="View Comments">
        <CommentList
          blog={blog}
          user={user}
          setNotification={setNotification}
        />
      </Togglable>

      {user && user.role === 'admin' && (
        <Box mt={2}>
          <Button variant="outlined" color="primary" onClick={() => handleEdit(blog)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => handleDelete(blog.id)}>
            Delete
          </Button>
        </Box>
      )}

      {/* Modals */}
      <EditBlogModal
        open={editModalOpen}
        blog={editingBlog}
        setBlogs={setBlogs}
        setNotification={setNotification}
        onClose={() => setEditModalOpen(false)}
      />
    </Box>
  )
}

export default Blog
