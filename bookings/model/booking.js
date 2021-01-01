// eslint-disable-next-line no-unused-vars
// const { Sequelize, DataTypes, Model } = require("sequelize");
const Sequelize = require("sequelize").Sequelize;

const Booking = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  bookerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: "booker_id",
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: "is_active",
  },
};


module.exports = Booking;
