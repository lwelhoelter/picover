const Sequelize = require('sequelize');
const db = require('../database');

module.exports = db.define('photo', {
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'https://picsum.photos/300/200'
  }
});