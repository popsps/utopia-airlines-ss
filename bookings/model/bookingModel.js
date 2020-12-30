const { DataTypes } = require("sequelize");

const Booking = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: "id",
  },
};

module.exports = Booking;