import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useNotification } from '../../context/NotificationContext'
import LoadingModal from './LoadingModal'

const GoogleRedirectHandler = () => {
  const { googleLogin } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [hasProcessed, setHasProcessed] = useState(false)
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(true) // For controlling the loading modal

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state') // Get the state parameter
    const redirectPath = state || '/' // Use state as redirect path, default to '/'
    if (code && !hasProcessed) {
      console.log('Received authorization code:', code)
      setHasProcessed(true)
      googleLogin({ code })
        .then(() => {
          setLoading(false) // Stop loading
          showNotification('¡Inicio de sesión exitoso!', 'success')
          navigate(redirectPath)
        })
        .catch((error) => {
          setLoading(false) // Stop loading
          console.error('Error during Google login:', error)
          showNotification('Error durante el inicio de sesión con Google.', 'error')
          navigate(redirectPath)
        })
    } else if (!code) {
      console.log('No code parameter found in URL')
      setLoading(false)
    }
  }, [searchParams, googleLogin, navigate, hasProcessed, showNotification])

  return (
    <>
      <LoadingModal open={loading} />
    </>
  )
}

export default GoogleRedirectHandler
