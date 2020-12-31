// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require("sequelize");

const Passenger = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "booking_id",
  },
  givenName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "given_name",
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "family_name",
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "dob",
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "gender",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "address",
  },
};

module.exports = Passenger;
