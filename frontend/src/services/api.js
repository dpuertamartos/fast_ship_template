import axios from 'axios'
import { handleLogout } from '../context/AuthHelper'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const axiosInstance = axios.create({
  baseURL: '/api',
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout()  // Trigger the logout process
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
