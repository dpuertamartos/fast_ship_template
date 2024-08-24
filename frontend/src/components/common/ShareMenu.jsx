import { useState } from 'react'
import { IconButton, Box, Menu, MenuItem } from '@mui/material'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, EmailIcon, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share'
import ShareIcon from '@mui/icons-material/Share'

const ShareMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)

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

    return (
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
    )
}

export default ShareMenu