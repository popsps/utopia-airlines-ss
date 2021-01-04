const { Model, INTEGER, TIME, DATE, FLOAT } = require("sequelize");
const { sequelize } = require("../db");

class Flight extends Model {

}

Flight.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  routeId: {
    type: INTEGER,
    primaryKey: true,
  },
  departureTime: {
    type: DATE,
    primaryKey: true,   
  },
  flightDuration: {
    type: TIME,
    allowNull: false,
  },
  capacity: {
    type: INTEGER,
    allowNull: false,
  },
  seatPrice: {
    type: FLOAT,
    allowNull: false,
  },
}, {
  tableName: "flight",
  freezeTableName: true,
  sequelize,
});

module.exports = { Flight };