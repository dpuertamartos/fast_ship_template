const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
})

module.exports = Comment
