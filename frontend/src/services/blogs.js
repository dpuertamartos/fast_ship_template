// src/services/blogs.js
import axiosInstance from './api'

const getAll = async () => {
  const response = await axiosInstance.get('/blogs')
  return response.data
}

const get = async (id) => {
  const response = await axiosInstance.get(`/blogs/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axiosInstance.post('/blogs', newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axiosInstance.delete(`/blogs/${id}`)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axiosInstance.put(`/blogs/${id}`, updatedObject)
  return response.data
}

export default { getAll, get, create, remove, update }
