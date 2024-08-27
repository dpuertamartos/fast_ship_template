import { Box, Drawer, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ExtraDrawer = ({ theme, handleDrawerToggle, drawerOpen, drawerContent }) => {

  return (
    <Drawer
      variant="temporary"
      anchor="top"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: '80%',
          maxHeight: '85vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          margin: 'auto',
          paddingTop: theme.spacing(2),
        }
      }}
    >
      <Box sx={{ width: '80%' }}>
        <IconButton
          aria-label="close"
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ width: '100%', paddingTop: theme.spacing(4) }}>
          {drawerContent}
        </Box>
      </Box>
    </Drawer>
  )
}

export default ExtraDrawer