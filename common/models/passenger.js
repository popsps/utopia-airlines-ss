// eslint-disable-next-line no-unused-vars
const Sequelize = require("sequelize").Sequelize;

const Passenger = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  bookingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: "booking_id",
  },
  givenName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "given_name",
  },
  familyName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "family_name",
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "dob",
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "gender",
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "address",
  },
};

module.exports = Passenger;
