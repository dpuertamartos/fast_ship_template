// src/services/blogs.js
import axiosInstance from './api'

const getAll = async () => {
  const response = await axiosInstance.get('/blogs')
  return response.data
}

const create = async (newObject) => {
  const response = await axiosInstance.post('/blogs', newObject)
  return response.data
}

export default { getAll, create }
