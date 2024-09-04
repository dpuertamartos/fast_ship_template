import { Box, TextField, Button } from '@mui/material'

const AddComment = ({ newComment, setNewComment, handleAddComment }) => {
  return (
    <Box mt={2}>
      <TextField
        label="New Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddComment} variant="outlined" color="primary">
        Add Comment
      </Button>
    </Box>
  )
}

export default AddComment
