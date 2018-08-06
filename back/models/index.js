const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfig = require('../config/environment');
//const config = require('./config');
//환경변수
const username = process.env.dbUsername || envConfig.mysql.username;
const password = process.env.dbPassword || envConfig.mysql.password;
const database = process.env.database || envConfig.mysql.database;
const host = process.env.host || envConfig.mysql.host;
const dialect = process.env.dialect || envConfig.mysql.dialrect;

let sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql'
});

let db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
    console.log('db::', db);
  });
//관계가 있으면
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
