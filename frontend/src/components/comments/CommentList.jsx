import { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import EditCommentModal from './EditCommentModal'
import commentService from '../../services/comments'
import AddComment from './AddComment'

const CommentList = ({ blog, user, setErrorMessage }) => {
  const [comments, setComments] = useState([]) // Local state for comments
  const [newComment, setNewComment] = useState('')
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false)
  const [editingComment, setEditingComment] = useState(null)

  const fetchComments = async () => {
    try {
      const fetchedComments = await commentService.getByBlog(blog.id)
      setComments(fetchedComments)
    } catch (error) {
      console.error('Failed to fetch comments', error)
      setErrorMessage('Failed to fetch comments')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    fetchComments() // Fetch comments when component mounts
  }, [])

  const handleAddComment = async () => {
    try {
      const savedComment = await commentService.create({ content: newComment, blogId: blog.id })
      setComments((prevComments) => [...prevComments, savedComment])
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment', error)
      setErrorMessage('Failed to add comment')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleEditComment = (comment) => {
    setEditingComment(comment)
    setEditCommentModalOpen(true)
  }

  const handleUpdateComment = async (updatedComment) => {
    try {
      const savedComment = await commentService.update(updatedComment.id, {
        content: updatedComment.content,
      })
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === savedComment.id ? savedComment : comment))
      )
      setEditCommentModalOpen(false)
    } catch (error) {
      console.error('Failed to update comment', error)
      setErrorMessage('Failed to update comment')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.remove(commentId)
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))
      } catch (error) {
        console.error('Failed to delete comment', error)
        setErrorMessage('Failed to delete comment')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <Box>
      <Typography variant="subtitle2" mt={2}>
        Comments:
      </Typography>
      {user && (
        <AddComment
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      )}
      {comments.map((comment) => (
        <Box key={comment.id} ml={2}>
          <Typography variant="body2">{comment.content}</Typography>
          <Typography variant="caption">By {comment.user.email}</Typography>
          {(user && (user.role === 'admin' || comment.user.email === user.email)) && (
            <Box mt={1}>
              <Button variant="outlined" color="primary" onClick={() => handleEditComment(comment)}>
                Edit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </Button>
            </Box>
          )}
        </Box>
      ))}
      {editingComment && (
        <EditCommentModal
          open={editCommentModalOpen}
          editingComment={editingComment}
          setEditingComment={setEditingComment}
          handleUpdateComment={handleUpdateComment}
          onClose={() => setEditCommentModalOpen(false)}
        />
      )}
    </Box>
  )
}

export default CommentList
