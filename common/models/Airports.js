const { Model, STRING } = require("sequelize");
const { sequelize } = require("../db");

class Airport extends Model { 
  toJSON(){
    const values = Object.assign({}, this.get());
    return values;
  }
}

Airport.init({
  iataId: {
    type: STRING,
    primaryKey: true,
  },
  city: {
    type: STRING,
    allowNull: false,
  },
}, { 
  tableName: "airport",
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  sequelize,
});
