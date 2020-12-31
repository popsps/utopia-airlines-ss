// eslint-disable-next-line no-unused-vars
const sequelize = require("../db");
const { booking } = require("../model");


const bookingDao = sequelize.define("booking", booking, {
  tableName: "booking",
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});


module.exports = {bookingDao};