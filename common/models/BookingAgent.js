const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class BookingAgent extends Model {
  static associate({ User }) {
    BookingAgent.belongsTo(User, {
      foreignKey: {
        name: "bookerId",
        field: "booker_id",
        allowNull: false,
      },
      as: "booker",
    });
  }
}

BookingAgent.init ({
  bookingId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
}, {
  tableName: "booking_booker",
  freezeTableName: true,
  sequelize,
});


module.exports = { BookingAgent };