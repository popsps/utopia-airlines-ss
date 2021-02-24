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
    const { latitude, longitude, altitude, ...values } = Object.assign({}, this.get());
    return {
      ...values,
      coords: {
        latitude,
        longitude,
        altitude,
      },
    };
  }
}

Airport.init({
  iataId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  altitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  timezone: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, { 
  tableName: "airport",
  freezeTableName: true,
  sequelize,
});

module.exports = { Airport };
