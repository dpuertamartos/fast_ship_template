// src/components/common/LoginForm.jsx
import { useState } from 'react'
import { TextField, Button, Typography, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAuth } from '../../context/AuthContext' // Import useAuth from context
import userService from '../../services/users'
import Notification from './Notification'

const LoginForm = ({ closeModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [message, setMessage] = useState({
    type: 'success',
    message: null
  })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const { login } = useAuth()  // Use login method from AuthContext

  const handleEmailChange = (event) => {
    const emailValue = event.target.value
    setEmail(emailValue)

    if (!/.+@.+\..+/.test(emailValue)) {
      setEmailError('Please enter a valid email address')
      setIsFormValid(false)
    } else {
      setEmailError('')
      validateForm(emailValue, password)
    }
  }

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value
    setPassword(passwordValue)

    if (passwordValue.trim().length === 0) {
      setPasswordError('Password cannot be empty')
      setIsFormValid(false)
    } else {
      setPasswordError('')
      validateForm(email, passwordValue)
    }
  }

  const validateForm = (email, password) => {
    if (/.+@.+\..+/.test(email) && password.trim().length > 0) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)  // Use login method from context
      setEmail('')
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
        email,
        password
      })

      setMessage({
        type: 'success',
        message: 'Registration successful.'
      })
      await handleLogin({ email, password }) // Log in after successful registration
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
      <form onSubmit={isRegistering ? handleRegister : (e) => { e.preventDefault(); handleLogin({ email, password }) }}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={emailError}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          helperText={passwordError}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={!isFormValid}>
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
