import { useState, useRef } from 'react'
import { Button, TextField } from '@mui/material'

import blogService from '../../services/blogs'
import Togglable from '../common/Togglable'

const AddBlog = ({ blogs, setBlogs, setErrorMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })
  const blogFormRef = useRef()

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <TextField label="Title" name="title" value={newBlog.title} onChange={handleChange} fullWidth />
        <TextField label="Content" name="content" value={newBlog.content} onChange={handleChange} fullWidth multiline rows={4} />
        <TextField label="Author" name="author" value={newBlog.author} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">Add Blog</Button>
      </form>
    </Togglable>
  )
}

export default AddBlog
