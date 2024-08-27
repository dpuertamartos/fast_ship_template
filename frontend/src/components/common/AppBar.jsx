import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Tune'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShareMenu from './ShareMenu'
import menuItems from '../../config/menuConfig' // Import the menu configuration

const TopMenu = ({ location, linkStyle, theme, isLargeScreen, handleDrawerToggle, handleMenuToggle, user, onLogin }) => {

  const appBarStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: theme.palette.text.primary,
    boxShadow: 'none',
    backdropFilter: 'blur(10px)',
  }

  // Determine if settings icon should be shown based on the current path
  const showSettingsIcon = menuItems.some(
    (item) => item.path === location.pathname && item.showSettingsIcon
  )

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
                  <IconButton
                    color={location.pathname === '/profile' ? 'primary' : 'inherit'}
                    component={Link}
                    to="/profile"
                  >
                    <AccountCircle />
                  </IconButton>
                ) : (
                  <Button
                    color="inherit"
                    sx={{ ...linkStyle, color: 'inherit' }}
                    onClick={onLogin}
                  >
                    LOGIN
                  </Button>
                )}
                {/* These are the variable menu items in the menuconfig.js */}
                {menuItems.map(
                  (item) =>
                    item.showInAppBar && (
                      <Button
                        key={item.path}
                        component={Link}
                        to={item.path}
                        sx={{
                          ...linkStyle,
                          color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                        }}
                      >
                        {item.label.toUpperCase()}
                      </Button>
                    )
                )}
              </>
            )}
          </Box>
          {!isLargeScreen && showSettingsIcon && (
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
