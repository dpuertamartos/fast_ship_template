import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Typography } from '@mui/material'
import Blog from './Blog'
import AddBlog from './AddBlog'
import blogService from '../../services/blogs'

const BlogList = ({ setErrorMessage }) => {
  const { user } = useAuth() // Use context to get user info
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
      .catch(error => setErrorMessage('Failed to load blogs'))
  }, [setErrorMessage])

  return (
    <>
      <Typography variant="h4">Blogs</Typography>
      {user && user.role === 'admin' && (
        <AddBlog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
      )}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
      ))}
    </>
  )
}

export default BlogList
