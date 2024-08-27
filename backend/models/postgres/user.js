const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/sequelize')
const Note = require('./note')  // Import Note model for associations

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
})

// Define associations
User.hasMany(Note, { foreignKey: 'userId' })
Note.belongsTo(User, { foreignKey: 'userId' })

module.exports = User
