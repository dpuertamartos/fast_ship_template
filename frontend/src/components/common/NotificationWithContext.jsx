import { Alert, Snackbar } from '@mui/material'
import { useNotification } from '../../context/NotificationContext'

const NotificationWithContext = () => {
  const { notification, clearNotification } = useNotification()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    clearNotification()
  }

  return (
    <Snackbar
      open={Boolean(notification.message)}
      autoHideDuration={5000} // Display for 5 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Alert severity={notification.severity} variant="filled" onClose={handleClose}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default NotificationWithContext
