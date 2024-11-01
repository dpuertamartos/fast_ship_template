// src/components/common/LoginForm.jsx
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import { TextField, Button, Typography, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAuth } from '../../context/AuthContext' // Import useAuth from context
import userService from '../../services/users'
import Notification from './Notification'

const LoginForm = ({ closeModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [message, setMessage] = useState({
    type: 'success',
    message: null
  })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const { login } = useAuth()  // Use login method from AuthContext

  const googleAuthLogin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: `${window.location.origin}/auth/google/callback`, // Must match exactly with your registered redirect URI
    state: window.location.pathname, // Pass the current path in the state parameter
  })

  const handleEmailChange = (event) => {
    const emailValue = event.target.value.trim()
    setEmail(emailValue)

    // Check if email contains spaces
    if (/\s/.test(emailValue)) {
      setEmailError('El email no puede contener espacios')
      setIsFormValid(false)
    } else if (!/.+@.+\..+/.test(emailValue)) {
      setEmailError('Por favor introduzca un email válido')
      setIsFormValid(false)
    } else {
      setEmailError('')
      validateForm(emailValue, password, confirmPassword)
    }
  }

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value.trim()
    setPassword(passwordValue)

    // Check if password contains spaces
    if (/\s/.test(passwordValue)) {
      setPasswordError('La contraseña no puede contener espacios')
      setIsFormValid(false)
    } else if (passwordValue.length === 0) {
      setPasswordError('La contraseña no puede estar vacía')
      setIsFormValid(false)
    } else {
      setPasswordError('')
      validateForm(email, passwordValue, confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value.trim()
    setConfirmPassword(confirmPasswordValue)
    validateForm(email, password, confirmPasswordValue)
  }

  const validateForm = (email, password, confirmPassword) => {
    // Check for spaces in email and password
    const emailHasSpaces = /\s/.test(email)
    const passwordHasSpaces = /\s/.test(password)

    if (emailHasSpaces || passwordHasSpaces) {
      setIsFormValid(false)
      return
    }

    if (/.+@.+\..+/.test(email) && password.length > 0) {
      if (isRegistering && password !== confirmPassword) {
        setPasswordError('Las contraseñas no coinciden')
        setIsFormValid(false)
      } else {
        setPasswordError('')
        setIsFormValid(true)
      }
    } else {
      setIsFormValid(false)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
      setEmail('')
      setPassword('')
      setMessage({
        type: 'success',
        message: '¡Inicio de sesión exitoso!'
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
        message: 'Credenciales incorrectas'
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

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    try {
      const newUser = await userService.register({
        email: trimmedEmail,
        password: trimmedPassword
      })

      setMessage({
        type: 'success',
        message: '¡Registro exitoso! Revise su email y carpeta de spam para confirmar. Inicio de sesión automático...'
      })
      setTimeout(async () => {
        await handleLogin({ email: trimmedEmail, password: trimmedPassword })
      }, 15000)

    } catch (exception) {
      setMessage({
        type: 'error',
        message: 'Registro fallido. Por favor, inténtelo de nuevo en unos segundos.'
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
      <form onSubmit={isRegistering ? handleRegister : (e) => { e.preventDefault(); handleLogin({ email: email.trim(), password: password.trim() }) }}>
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
          label="Contraseña"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          helperText={passwordError}
          fullWidth
          margin="normal"
        />
        {isRegistering && (
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            fullWidth
            margin="normal"
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            '&.Mui-disabled': {
              color: 'black',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
          }}
          disabled={!isFormValid}
        >
          {isRegistering ? 'Registrar cuenta' : 'Iniciar sesión'}
        </Button>
        {/* Google Login Button */}
        <Button
          onClick={() => googleAuthLogin()}
          fullWidth
          variant="outlined"
          startIcon={<FcGoogle />}
          sx={{ mt: 2 }}
        >
        Iniciar sesión con Google
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
