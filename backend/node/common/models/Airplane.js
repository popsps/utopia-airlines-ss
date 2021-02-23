const { Model } = require("sequelize");
const { sequelize } = require("../db");

class Airplane extends Model {
  static associate({ Flight }) {
    Airplane.hasMany(Flight, {
      foreignKey: {
        name: "airplaneId",
        field: "airplane_id",
        allowNull: false,
      },
      as: "flights",
    });
  }
  toJSON(){
    const values = Object.assign({}, this.get());
    return values;
  }
}

Airplane.init({}, { 
  tableName: "airplane",
  freezeTableName: true,
  sequelize,
});

module.exports = { Airplane };