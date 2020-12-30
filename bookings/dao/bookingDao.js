const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");
const booking = require("../model/booking");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.Host,
  dialect: dbConfig.dialect,
});

const bookingDao = sequelize.define("booking", booking, {
  timestamps: false,
});

module.exports = bookingDao;