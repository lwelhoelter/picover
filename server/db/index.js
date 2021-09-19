const db = require('./database')
const User = require('./models/User')
const Photo = require('./models/Photo')

Photo.belongsTo(User);
User.hasMany(Photo)

module.exports = {
  db,
  User,
  Photo
}