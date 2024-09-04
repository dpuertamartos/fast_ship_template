import { Box, Modal, Typography, TextField, Button } from '@mui/material'

const EditCommentModal = ({ open, editingComment, setEditingComment, handleUpdateComment, onClose }) => {
  const handleCommentEditChange = (event) => {
    const { value } = event.target
    setEditingComment((prevComment) => ({
      ...prevComment,
      content: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()  // Prevent default form submission
    handleUpdateComment(editingComment)  // Pass the updated comment object
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Comment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Content"
            name="content"
            value={editingComment.content}
            onChange={handleCommentEditChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default EditCommentModal
