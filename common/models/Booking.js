const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Booking extends Model { 
  toJSON(){
    const values = Object.assign({}, this.get());
    return values;
  }
}

Booking.init ({
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  confirmationCode: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
}, {
  tableName: "booking",
  freezeTableName: true,
  sequelize,
});


module.exports = { Booking };
