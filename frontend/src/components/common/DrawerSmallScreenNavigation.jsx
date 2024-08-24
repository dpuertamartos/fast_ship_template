import { Link } from "react-router-dom"
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material'

const SmallScreenNavMenu = ({location, theme, linkStyle, menuOpen, handleMenuToggle}) => {

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
              <ListItemText primary={<Typography sx={drawerItemStyle('/explora')}>NOTAS</Typography>} />
            </ListItem>
            <ListItem button component={Link} to="/contact" onClick={handleMenuToggle} sx={drawerItemStyle('/contact')}>
              <ListItemText primary={<Typography sx={drawerItemStyle('/contact')}>INFO</Typography>} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    )
}

export default SmallScreenNavMenu