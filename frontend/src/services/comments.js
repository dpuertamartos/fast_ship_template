import axiosInstance from './api'

const create = async (newObject) => {
  const response = await axiosInstance.post('/comments', newObject)
  return response.data
}

export default { create }
