const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,  // Regex for email validation
  },
  passwordHash: String,
  role: {
    type: String,
    enum: ['user', 'admin'], // Enum restricts the values for role
    default: 'user', // Default role is 'user'
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString()
    }
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // the passwordHash should not be revealed
  },
})


const User = mongoose.model('User', userSchema)

module.exports = User
