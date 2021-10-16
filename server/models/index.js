const fs = require('fs');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const db = require('../db');
const basename = path.basename(__filename);
const Models = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  // .map(arra => arra.replace(/^\w|\-\w/g, text => text.toUpperCase()))
  // .map(a => a.replace(/[-]|model|\.js$/gi, ''))
  // .map(l => l.replace(/s$/, ''))
  .forEach((file) => {
    console.log(file)
    const model = require(path.join(__dirname, file))(db, DataTypes);
    Models[model.name] = model;
});

Object.keys(Models).forEach(modelName => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models)
  }
})

Models.sequelize = db.sync({ alter: true })
Models.Sequelize = Sequelize

module.exports = Models;