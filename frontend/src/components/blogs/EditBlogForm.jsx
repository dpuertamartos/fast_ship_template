import { useState } from 'react'
import { Modal, Box, Button, TextField } from '@mui/material'
import blogsService from '../../services/blogs'

const EditBlogForm = ({ blog, isOpen, onClose, onUpdate }) => {
  const [title, setTitle] = useState(blog.title)
  const [content, setContent] = useState(blog.content)
  const [author, setAuthor] = useState(blog.author)

  const handleUpdate = async () => {
    try {
      const updatedBlog = await blogsService.update(blog.id, { title, content, author })
      onUpdate(updatedBlog)
      onClose()
    } catch (error) {
      console.error('Failed to update blog post', error)
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
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
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>Save Changes</Button>
      </Box>
    </Modal>
  )
}

export default EditBlogForm
