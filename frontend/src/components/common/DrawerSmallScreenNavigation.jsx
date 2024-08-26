import { Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

const SmallScreenNavMenu = ({ location, theme, linkStyle, menuOpen, handleMenuToggle, user, onLogin, onLogout }) => {
  const drawerItemStyle = (path) => ({
    ...linkStyle,
    color: location.pathname === path ? theme.palette.primary.main : 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  })

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={handleMenuToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Semi-transparent background
          backdropFilter: 'blur(10px)',  // Blur effect
          boxShadow: theme.shadows[5],  // Subtle shadow for depth
        }
      }}
    >
      <Box>
        <List>
          <ListItem button component={Link} to="/" onClick={handleMenuToggle} sx={drawerItemStyle('/')}>
            <ListItemText primary={<Typography sx={drawerItemStyle('/')}>INICIO</Typography>} />
          </ListItem>
          <ListItem button component={Link} to="/notes" onClick={handleMenuToggle} sx={drawerItemStyle('/notes')}>
            <ListItemText primary={<Typography sx={drawerItemStyle('/notes')}>NOTAS</Typography>} />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={handleMenuToggle} sx={drawerItemStyle('/contact')}>
            <ListItemText primary={<Typography sx={drawerItemStyle('/contact')}>INFO</Typography>} />
          </ListItem>
          {user ? (
            <>
              <ListItem button component={Link} to="/profile" onClick={handleMenuToggle} sx={drawerItemStyle('/profile')}>
                <ListItemText primary={<Typography sx={drawerItemStyle('/profile')}>PERFIL</Typography>} />
              </ListItem>
              <ListItem button onClick={onLogout} sx={drawerItemStyle('/profile')}>
                <IconButton color="inherit"><LogoutIcon /></IconButton>
                <ListItemText primary={<Typography sx={drawerItemStyle('/profile')}>LOGOUT</Typography>} />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={onLogin} sx={drawerItemStyle('/profile')}>
              <IconButton color="inherit"><LoginIcon /></IconButton>
              <ListItemText primary={<Typography sx={drawerItemStyle('/profile')}>LOGIN</Typography>} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default SmallScreenNavMenu
