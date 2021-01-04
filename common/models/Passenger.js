const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Passenger extends Model { 
  toJSON(){
    const values = Object.assign({}, this.get());
    return values;
  }
}

Passenger.init({
  givenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "passenger",
  freezeTableName: true,
  sequelize,
});

module.exports = { Passenger };
