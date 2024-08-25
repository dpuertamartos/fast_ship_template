import React from 'react'
import { Button, Box, Typography, Grid, Paper, List, ListItem, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import ContactButton from '../components/common/ContactButton'

const Contact = () => {
  const faqs = [
    { question: '¿Cómo?', answer: 'Si' }
  ]

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundImage: 'url("4_medium.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // use minHeight instead of height
      color: 'text.primary',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      p: isSmallScreen ? 2 : 4, // responsive padding
    }}>
      <Grid container spacing={isSmallScreen ? 2 : 3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{
            p: isSmallScreen ? 2 : 4, // responsive padding
            bgcolor: 'background.paper',
            opacity: 0.95,
            overflow: 'auto', // allow scrolling within Paper if content overflows
            mb: isSmallScreen ? 2 : 0, // add bottom margin on small screens
          }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>Información de contacto</Typography>
            <ContactButton />
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>Sobre la página web</Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                        Esta web está desarrollada
              <br />
              <br />
                        Los datos .
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>Sobre mí</Typography>
            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                        Mi nombre es David.
              <br />
              <br />
                        Tras un período trabajando en investigación, comencé a trabajar en Ingenieria de Software y Datos.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{
            p: isSmallScreen ? 2 : 4, // responsive padding
            bgcolor: 'background.paper',
            opacity: 0.95,
            overflow: 'auto', // allow scrolling within Paper if content overflows
          }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>Preguntas Frecuentes</Typography>
            <List>
              {faqs.map((faq, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography color="text.primary" sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>}
                      secondary={faq.answer}
                    />
                  </ListItem>
                  {index !== faqs.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
            <Button variant="outlined" color="secondary" component={Link} to="/privacy_policy">
                            Ver Política de Privacidad
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact




