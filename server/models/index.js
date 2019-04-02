'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelizeArgs = 
  config.use_env_variables 
  ? [process.env[config.use_env_variable]]
  : [config.database, config.username, config.password];

const sequelize = new Sequelize(...sequelizeArgs, config);

const db = fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .reduce((acc, file) => {
    const model = sequelize.import(path.join(__dirname, file));
    return {
      ...acc,
      [model.name]: model
    };
  }, { sequelize, Sequelize });

module.exports = db;
