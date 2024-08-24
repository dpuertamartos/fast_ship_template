import { Button } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

const ContactButton = () => {
    return(
        <Button 
            variant="outlined" 
            startIcon={<MailOutlineIcon />} 
            href="mailto:data@gmail.com" 
            sx={{ my: 2, textTransform: 'none' }}
            >
            data@gmail.com
        </Button>
    )
}

export default ContactButton