// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require("sequelize");

const Booking = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: "id",
  },
  bookerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "booker_id",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "booker_id",
  },
};

module.exports = Booking;
