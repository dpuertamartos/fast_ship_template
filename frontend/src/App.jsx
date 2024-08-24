import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { AppBar, Toolbar, Button, CssBaseline, IconButton, useTheme, useMediaQuery, Box, Menu, MenuItem } from '@mui/material'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, EmailIcon, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share'
import SettingsIcon from '@mui/icons-material/Tune'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ShareIcon from '@mui/icons-material/Share'
import Notification from './components/Notification'
import Footer from './components/common/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Contact from './views/Contact'
import PrivacyPolicy from './views/PrivacyPolicy'
import Home from './views/Home'
import Notes from './views/Notes'
import SmallScreenNavMenu from './components/common/DrawerSmallScreenNavigation'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top of the window when the location changes
  }, [location])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BuscaHogar',
        text: 'Échale un ojo a este buscador de inmuebles, con tasación automática!',
        url: 'https://www.buscahogar.es',
      }).catch((error) => console.log('Error sharing', error))
    } else {
      alert('Your browser does not support the native share functionality.')
    }
    handleClose()
  }

  const appBarStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    color: theme.palette.text.primary,
    boxShadow: 'none', // Removes the shadow
    backdropFilter: 'blur(10px)', // Ensures text is legible on the transparent background
  }

  const linkStyle = {
    fontWeight: 600,
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&.active': {
      color: theme.palette.primary.main,
    },
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={appBarStyle}>
        <Toolbar sx={{ justifyContent: 'flex-end', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 'auto' }}>
            <IconButton color="inherit" onClick={handleShareClick}>
              <ShareIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <FacebookShareButton url="https://www.buscahogar.es" hashtag="BuscaHogar">
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </MenuItem>
              <MenuItem>
                <TwitterShareButton url="https://www.buscahogar.es" title="Échale un ojo a este buscador de inmuebles, con tasación automática!">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </MenuItem>
              <MenuItem>
                <LinkedinShareButton url="https://www.buscahogar.es" title="Échale un ojo a este buscador de inmuebles, con tasación automática!">
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </MenuItem>
              <MenuItem>
                <WhatsappShareButton url="https://www.buscahogar.es" title="Échale un ojo a este buscador de inmuebles, con tasación automática!">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </MenuItem>
              <MenuItem>
                <EmailShareButton
                  subject="Te comparto buscahogar.es, un buscador de inmuebles"
                  body={`https://www.buscahogar.es\n\nÉchale un ojo a este buscador de inmuebles, con tasación automática!`}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </MenuItem>
              {navigator.share && (
                <MenuItem onClick={handleNativeShare}>
                  <ShareIcon sx={{ marginRight: 1 }} /> Comparte a tus apps
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color={location.pathname === '/' ? 'primary' : 'inherit'} component={Link} to="/">
              <HomeIcon />
            </IconButton>
            {isLargeScreen && (
              <>
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
              color={location.pathname !== '/' ? 'primary' : 'inherit'} // Change color if not on home route
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



      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
{/*           <Route path="/explora/:id" element={<FlatDetailed />} />
          <Route path="/explora" element={<Explora errorMessage={errorMessage} drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />} />
           */}
          <Route path="/notes" element={<Notes />} /> 
          <Route path="/contact" element={<Contact drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} /> 
          <Route path="/" element={<Home />} />
        </Routes>

      </Box>

      {/* This is a Drawer for small screen navigation menu appearing as a drawer in left side */}
      <SmallScreenNavMenu linkStyle={linkStyle} location={location} theme={theme} menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} />

      <Footer />
    </Box>
  )
}

export default App