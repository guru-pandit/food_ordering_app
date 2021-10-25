'use strict';

require("dotenv").config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//console.log("IndexJS(env)", env);
//console.log("IndexJS(config)", config);
//console.log("IndexJS(config.use_env_variable)", config.use_env_variable);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    //console.log("files: ", file)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //console.log("model: ", model)
    //console.log("modelname: ", model.name)
    db[model.name] = model;
    //console.log(db)
  });
//console.log(Object.keys(db))
Object.keys(db).forEach(modelName => {
  //console.log(modelName)
  if (db[modelName].associate) {
    //console.log(db[modelName].associate)
    db[modelName].associate(db);
    //console.log(db[modelName].associate(db))
  }
});
//console.log("second last db : ", db)
db.sequelize = sequelize;
//console.log("final db: ", db)
db.Sequelize = Sequelize;
//console.log("final db: ", db)

module.exports = db;
