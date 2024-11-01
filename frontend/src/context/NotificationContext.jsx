import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: null,
    severity: 'success',
  })

  const showNotification = (message, severity = 'success') => {
    setNotification({ message, severity })
  }

  const clearNotification = () => {
    setNotification({ message: null, severity: 'success' })
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
