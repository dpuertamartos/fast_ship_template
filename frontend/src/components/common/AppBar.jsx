import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Tune'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShareMenu from './ShareMenu'

const TopMenu = ({ location, linkStyle, theme, isLargeScreen, handleDrawerToggle, handleMenuToggle, user, onLogin, onLogout }) => {

  const appBarStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    color: theme.palette.text.primary,
    boxShadow: 'none', // Removes the shadow
    backdropFilter: 'blur(10px)', // Ensures text is legible on the transparent background
  }

  return (
    <>
      <AppBar position="fixed" sx={appBarStyle}>
        <Toolbar sx={{ justifyContent: 'flex-end', gap: 4 }}>
          <ShareMenu />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color={location.pathname === '/' ? 'primary' : 'inherit'} component={Link} to="/">
              <HomeIcon />
            </IconButton>
            {isLargeScreen && (
              <>
                {user ? (
                  <>
                    <IconButton color={location.pathname === '/profile' ? 'primary' : 'inherit'} component={Link} to="/profile">
                      <AccountCircle />
                    </IconButton>
                  </>
                ) : (
                  <Button color="inherit" sx={{ ...linkStyle, color: 'inherit' }} onClick={onLogin}>LOGIN</Button>
                )}
                <Button component={Link} to="/notes" sx={{ ...linkStyle, color: location.pathname.startsWith('/notes') ? theme.palette.primary.main : 'inherit' }}>NOTES</Button>
                <Button component={Link} to="/contact" sx={{ ...linkStyle, color: location.pathname === '/contact' ? theme.palette.primary.main : 'inherit' }}>INFO</Button>
              </>
            )}
          </Box>
          {!isLargeScreen && (location.pathname === '/notes') && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <SettingsIcon />
            </IconButton>
          )}
          {!isLargeScreen && (
            <IconButton
              color={location.pathname !== '/' ? 'primary' : 'inherit'}
              aria-label="open menu"
              edge="start"
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default TopMenu
