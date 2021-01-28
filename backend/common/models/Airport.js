const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Airport extends Model {
  static associate({ Route }) {
    Airport.hasMany(Route, {
      foreignKey: {
        name: "originId",
        field: "origin_id",
        allowNull: false,
      },
      as: "departureRoutes",
    });
    Airport.hasMany(Route, {
      foreignKey: {
        name: "destinationId",
        field: "destination_id",
        allowNull: false,
      },
      as: "arrivalRoutes",
    });
  }
  toJSON(){
    const values = Object.assign({}, this.get());
    return values;
  }
}

Airport.init({
  iataId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { 
  tableName: "airport",
  freezeTableName: true,
  sequelize,
});

module.exports = { Airport };