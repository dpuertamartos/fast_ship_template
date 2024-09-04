import axiosInstance from './api'

const getByBlog = async (id) => {
  const response = await axiosInstance.get(`/comments/all/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axiosInstance.post('/comments', newObject)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axiosInstance.put(`/comments/${id}`, updatedObject)
  return response.data
}

const remove = async (id) => {
  const response = await axiosInstance.delete(`/comments/${id}`)
  return response.data
}

export default { getByBlog, create, update, remove }
