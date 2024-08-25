import { useState, useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import Note from '../components/notes/Note'
import noteService from '../services/notes'
import Togglable from '../components/common/Togglable_template'
import NoteForm from '../components/notes/NoteForm'

const Notes = ({ setErrorMessage, user }) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <Box>
      <Typography variant="h4">Notes</Typography>

      {user && <div>
        <Togglable buttonLabel='new note' ref={noteFormRef}>
          <NoteForm
            createNote={addNote}
          />
        </Togglable>
      </div>}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </Box>
  )
}

export default Notes