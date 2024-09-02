const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

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

module.exports = setupAssociations
