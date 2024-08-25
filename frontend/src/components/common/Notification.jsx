import { Alert, Snackbar } from '@mui/material'

const Notification = ({ message, severity = 'error' }) => {
  if (message === null) {
    return null
  }

  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
