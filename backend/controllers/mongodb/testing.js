const router = require('express').Router()
const Note = require('../../models/mongodb/note')
const User = require('../../models/mongodb/user')

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = router