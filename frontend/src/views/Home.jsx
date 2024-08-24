import { Box, Button, useTheme, useMediaQuery, Typography, Grid, Container, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { styled } from '@mui/system'
// import emailService from '../../services/emails'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '2px',
  width: '100%',
  background: theme.palette.divider,
  margin: theme.spacing(4, 0),
}))

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}))

const FadeInSection = styled(motion.div)(({ inView }) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(100px)',
  transition: 'opacity 1s ease-out, transform 1s ease-out',
}))

const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #6a11cb, #2575fc)',
  color: '#fff',
  padding: theme.spacing(8, 4),
  borderRadius: '10px',
  textAlign: 'center',
}))

const Home = () => {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (!validateEmail(event.target.value)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateEmail(email)) {
      setMessage('Por favor, introduce una dirección de correo electrónico válida.')
      return
    }

/*     try {
      const response = await emailService.addEmail({ email })
      setMessage('Email subscrito con éxito!')
      setEmail('')
    } catch (error) {
      if (error.response && error.response.data.error === 'not_unique_email') {
        setMessage('Email ya subscrito. Gracias.')
      } else {
        setMessage('Algo falló. Por favor, reintente.')
      }
    } */
  }

  const { ref: section1Ref, inView: section1InView } = useInView({ triggerOnce: true })
  const { ref: section2Ref, inView: section2InView } = useInView({ triggerOnce: true })
  const { ref: section3Ref, inView: section3InView } = useInView({ triggerOnce: true })

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url("/1_big.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mb: '10%',
          pl: '4%',
          pr: '4%',
        }}
      >
        <HeroOverlay />
        <Typography variant="h2" sx={{ mb: 4, zIndex: 1 }} gutterBottom>
          Encuentra tu hogar soñado
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, zIndex: 1 }}>
          Descubre inmuebles interesantes gracias a nuestro algoritmo de aprendizaje automático
        </Typography>
        <motion.div initial={{ opacity: 1, scale: 0.6 }} animate={{ opacity: 1, scale: 1.2 }} transition={{ duration: 1.5, delay: 0.5 }}>
          <StyledButton size="large" variant="contained" color="primary" sx={{ mt: 3, mb: 2, zIndex: 1 }} component={Link} to="/explora">
            Empieza tu búsqueda
          </StyledButton>
        </motion.div>
        <motion.div initial={{ opacity: 1, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 1 }}>
          <StyledButton size="large" variant="outlined" sx={{ m: 2, borderColor: '#fff', color: '#fff', zIndex: 1 }} component={Link} to="/valora">
            Valora
          </StyledButton>
        </motion.div>
      </Box>

      <FadeInSection ref={section1Ref} inView={section1InView}>  
      <Container>
        <Box sx={{ flexGrow: 1, py: isLargeScreen ? 0 : '4%', px: isLargeScreen ? 8 : 4, mb: '10%', backgroundColor: 'background.default' }}>
          <Grid container spacing={isLargeScreen ? 10 : 2} alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h4" component="div" color="primary.main" gutterBottom>
                  Flujo de datos actualizado
                </Typography>
                <Typography variant="h6" color="text.primary" textAlign="justify">
                  Hemos desarrollado un flujo de datos desde uno de los mayores portales inmobiliarios de España, lo que permite ofrecer una perspectiva innovadora en tendencias de inmuebles, precios y oportunidades de compra.
                </Typography>
                <StyledButton size="large" variant="outlined" color="primary" sx={{ mt: 5, mb: 2, justifyContent: 'center' }} component={Link} to="/contact">
                  Más info
                </StyledButton>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" component="div" color="primary.main" gutterBottom>
                  Aprendizaje Automático
                </Typography>
                <Typography variant="h6" color="text.primary" textAlign="justify">
                  Los datos permiten el entrenamiento de nuestros modelos de aprendizaje automático, que enriquecen el descubrimiento de tu próximo hogar mediante la asignación de un valor y puntuación a cada inmueble.
                </Typography>
                <StyledButton size="large" variant="outlined" color="primary" sx={{ mt: 5, mb: 2, justifyContent: 'center' }} component={Link} to="/valora">
                  Valora inmuebles
                </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
      </FadeInSection>

      <SectionDivider />

      <Container>
        <FadeInSection ref={section2Ref} inView={section2InView}>
          <GradientBackground>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="inherit" gutterBottom sx={{ fontWeight: 700 }}>
                ¿Estás listo para encontrar tu próximo hogar?
              </Typography>
              <Typography variant="h6" color="inherit" sx={{ mb: 4 }}>
                Explora las mejores opciones inmobiliarias con la ayuda de nuestro sistema de recomendación.
              </Typography>
              <StyledButton size="large" variant="contained" color="secondary" component={Link} to="/explora">
                Comienza Ahora
              </StyledButton>
            </Box>
          </GradientBackground>
        </FadeInSection>
      </Container>

      <SectionDivider />

      <Container>
        <FadeInSection ref={section3Ref} inView={section3InView} sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h3" color="#3f51b5" gutterBottom sx={{ fontWeight: 700 }}>
            Recibe nuestras novedades!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            No te preocupes, no enviamos spam. Solo enviaremos actualizaciones importantes.
          </Typography>
          <Box sx={{ flexGrow: 1, py: isLargeScreen ? 0 : '4%', px: isLargeScreen ? 8 : 4, mb: '10%', backgroundColor: 'background.default', textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Introduce tu e-mail"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? 'Introduce una dirección de correo electrónico válida.' : ''}
                sx={{ mr: 2, mb: 2 }}
              />
              <StyledButton type="submit" variant="contained" color="primary">
                Enviar
              </StyledButton>
            </form>
            {message && (
              <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </FadeInSection>
      </Container>

      <SectionDivider />
    </Box>
  )
}

export default Home
