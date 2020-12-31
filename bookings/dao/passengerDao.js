// eslint-disable-next-line no-unused-vars
const sequelize = require("../db");
const { passenger } = require("../model");


const passengerDao = sequelize.define("passenger", passenger, {
  tableName: "passenger",
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});

module.exports = passengerDao;