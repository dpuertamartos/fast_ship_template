const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/sequelize')

const Note = sequelize.define('Note', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 255],  // Equivalent to minlength in Mongoose
    }
  },
  important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Equivalent to createdAt and updatedAt in Mongoose
})

module.exports = Note