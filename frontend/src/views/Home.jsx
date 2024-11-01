import { Box, Typography } from '@mui/material'
import BlogList from '../components/blogs/BlogList'
import ExtraDrawer from '../components/common/ExtraDrawer'

const Home = ({ theme, isLargeScreen, handleDrawerToggle, drawerOpen, setNotification }) => {
  return (
    <Box>
      {!isLargeScreen && (
        <ExtraDrawer
          theme={theme}
          handleDrawerToggle={handleDrawerToggle}
          drawerOpen={drawerOpen}
          drawerContent={<Typography variant="h6">Hello Drawer!</Typography>}
        />
      )}
      <BlogList setNotification={setNotification} />
    </Box>
  )
}

export default Home
