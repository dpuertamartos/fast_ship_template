const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5]
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [20]
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
})

module.exports = Blog
