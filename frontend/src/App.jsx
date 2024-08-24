import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { AppBar, Toolbar, Button, CssBaseline, IconButton, useTheme, useMediaQuery, Box } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Tune'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import Footer from './components/common/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Contact from './views/Contact'
import PrivacyPolicy from './views/PrivacyPolicy'
import Home from './views/Home'
import Notes from './views/Notes'
import SmallScreenNavMenu from './components/common/DrawerSmallScreenNavigation'
import ShareMenu from './components/common/ShareMenu'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  

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
          <ShareMenu />
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