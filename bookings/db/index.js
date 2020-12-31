const { Sequelize, Model } = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.Host,
  dialect: dbConfig.dialect,
});

module.exports = sequelize;