import { useState } from 'react'
import { TextField, Button, Typography, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import loginService from '../../services/login'
import noteService from '../../services/notes'
import userService from '../../services/users'
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
    <Box sx={{ position: 'relative' }}>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Notification message={message.message} severity={message.type} />
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>{isRegistering ? 'Register' : 'Login'}</Typography>
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </form>
      <Button
        onClick={() => setIsRegistering(!isRegistering)}
        color="primary"
        fullWidth
        sx={{ mt: 2, textTransform: 'none', fontWeight: 'bold' }}
      >
        {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
      </Button>
    </Box>
  )
}

export default LoginForm
