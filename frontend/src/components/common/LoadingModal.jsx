import { Modal, Box, CircularProgress, Typography } from '@mui/material'

const LoadingModal = ({ open }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <CircularProgress />
        <Typography id="loading-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                    Gracias por la espera.
        </Typography>
        <Typography id="loading-modal-description" sx={{ mt: 2 }}>
                    Tiempo variable según carga de trabajo.
        </Typography>
      </Box>
    </Modal>
  )
}

export default LoadingModal
