// src/context/AuthHelper.jsx

let logoutCallback = null
let openLoginFormCallback = null

// Register the logout callback
export const setLogoutCallback = (callback) => {
  logoutCallback = callback
}

// Register the open login form callback
export const setOpenLoginFormCallback = (callback) => {
  openLoginFormCallback = callback
}

// Handle logout and open the login form
export const handleLogout = () => {
  if (logoutCallback) {
    logoutCallback()
  }
  if (openLoginFormCallback) {
    openLoginFormCallback()
  }
}
