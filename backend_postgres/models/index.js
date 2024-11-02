const Blog = require('./blog')
const User = require('./user')
const Comment = require('./comment')

const setupAssociations = () => {
  // One-to-Many: User to Blog
  User.hasMany(Blog, { foreignKey: 'userId' })
  Blog.belongsTo(User, { foreignKey: 'userId' })

  // One-to-Many: Blog to Comment
  Blog.hasMany(Comment, { foreignKey: 'blogId' })
  Comment.belongsTo(Blog, { foreignKey: 'blogId' })

  // One-to-Many: User to Comment
  User.hasMany(Comment, { foreignKey: 'userId' })
  Comment.belongsTo(User, { foreignKey: 'userId' })
}

const syncModels = async () => {
  try {
    await User.sync()
    await Blog.sync()
    await Comment.sync()

    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Error synchronizing models:', error)
  }
}

module.exports = {
  Comment,
  Blog,
  User,
  setupAssociations,
  syncModels
}