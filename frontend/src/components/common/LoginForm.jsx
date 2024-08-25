import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material' // Import Material-UI components
import loginService from '../../services/login'
import noteService from '../../services/notes'
import userService from '../../services/users' // Import userService
import Notification from './Notification'

const LoginForm = ({ setUser, closeModal }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [message, setMessage] = useState({
    type: 'success',
    message: null
  })

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        type: 'success',
        message: 'Login success!'
      })
      setTimeout(() => {
        setMessage({
          type: 'success',
          message: null
        })
        closeModal()
      }, 2000)
    } catch (exception) {
      setMessage({
        type: 'error',
        message: 'Wrong credentials'
      })
      setTimeout(() => {
        setMessage({
          type: 'success',
          message: null
        })
      }, 5000)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const newUser = await userService.register({
        username,
        password
      })

      setMessage({
        type: 'success',
        message: 'Registration successful.'
      })
      await handleLogin({ username, password })
    } catch (exception) {
      setMessage({
        type: 'error',
        message: 'Registration failed'
      })
      setTimeout(() => {
        setMessage({
          type: 'success',
          message: null
        })
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message.message} className={message.type} />
      <Typography variant="h5">{isRegistering ? 'Register' : 'Login'}</Typography>
      <form onSubmit={isRegistering ? handleRegister : (e) => { e.preventDefault(); handleLogin({ username, password }) }}>
        <TextField
          label="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </form>
      <Button onClick={closeModal} color="secondary" fullWidth>
        Cancel
      </Button>
      <Button onClick={() => setIsRegistering(!isRegistering)} color="primary" fullWidth>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </Button>
    </div>
  )
}

export default LoginForm
