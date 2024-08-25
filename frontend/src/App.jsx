import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CssBaseline, useTheme, useMediaQuery, Box } from '@mui/material'
import Footer from './components/common/Footer'
import noteService from './services/notes'
import LoginForm from './components/common/LoginForm'
import Notification from './components/Notification'
import Contact from './views/Contact'
import PrivacyPolicy from './views/PrivacyPolicy'
import Home from './views/Home'
import Notes from './views/Notes'
import SmallScreenNavMenu from './components/common/DrawerSmallScreenNavigation'
import TopMenu from './components/common/AppBar'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
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
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
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
      {/* This is the appbar in topside */}
      <TopMenu location={location} theme={theme} linkStyle={linkStyle} isLargeScreen={isLargeScreen} handleDrawerToggle={handleDrawerToggle} handleMenuToggle={handleMenuToggle} />

      <Box>
        <Notification message={errorMessage} />
        {!user && <LoginForm loginVisible={loginVisible} setLoginVisible={setLoginVisible} setUser={setUser} setErrorMessage={setErrorMessage}/>}
        {user && <p>{user.name} logged in</p>}
      </Box>

      {/* This is the body of the application */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/notes" element={<Notes user={user} setErrorMessage={setErrorMessage}/>} />
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