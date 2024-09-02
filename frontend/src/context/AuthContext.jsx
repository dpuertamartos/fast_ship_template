import { createContext, useContext, useState, useEffect } from 'react'
import loginService from '../services/login'
import { setToken } from '../services/api'
import { setLogoutCallback, setOpenLoginFormCallback } from './AuthHelper'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false) // Manage login form visibility

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }

    // Register the callbacks
    setLogoutCallback(logout)
    setOpenLoginFormCallback(() => setLoginVisible(true))
  }, [])

  const login = async (credentials) => {
    const user = await loginService.login(credentials)
    setUser(user)
    setToken(user.token)
    window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedAppUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loginVisible, setLoginVisible }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
