import { Link } from 'react-router-dom'
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material'

const SmallScreenNavMenu = ({ location, theme, linkStyle, menuOpen, handleMenuToggle, user, onLogin, onLogout }) => {

  const drawerItemStyle = (path) => ({
    ...linkStyle,
    color: location.pathname === path ? theme.palette.primary.main : 'inherit',
  })

  return(
    <Drawer anchor="left" open={menuOpen} onClose={handleMenuToggle}>
      <Box sx={{ width: 250 }}>
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
                <ListItemText primary={<Typography sx={drawerItemStyle('/profile')}>MI PERFIL</Typography>} />
              </ListItem>
              <ListItem button  onClick={onLogout} sx={drawerItemStyle('/profile`')}>
                <ListItemText primary={<Typography sx={drawerItemStyle('/profile')}>LOGOUT</Typography>} />
              </ListItem>
            </>
          ) : (
            <ListItem button  onClick={onLogin} sx={drawerItemStyle('/profile`')}>
              <ListItemText primary={<Typography sx={drawerItemStyle('/profile')}>LOGIN</Typography>} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default SmallScreenNavMenu