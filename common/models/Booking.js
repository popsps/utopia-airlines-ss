const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Booking extends Model {
  static associate({ Flight, Passenger }) {
    Booking.belongsToMany(Flight, {
      through: "flight_bookings",
      foreignKey: "booking_id",
      otherKey: "flight_id",
      as: "flights",
    });
    Booking.hasMany(Passenger, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "passengers",
    });
  }
  toJSON(){
    const values = Object.assign({}, this.get());
    delete values.confirmationCode;
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
