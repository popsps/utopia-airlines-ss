const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class BookingGuest extends Model {
}

BookingGuest.init ({
  bookingId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "booking_guest",
  freezeTableName: true,
  sequelize,
});


module.exports = { BookingGuest };
