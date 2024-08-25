import { Box, Typography, Button } from '@mui/material'

const Profile = ({ user, onLogout }) => {
  if (!user) return null

  return (
    <Box>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="body1">Username: {user.username}</Typography>
      <Button onClick={onLogout}>LOGOUT</Button>
    </Box>
  )
}

export default Profile
