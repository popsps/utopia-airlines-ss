const { bookingDao } = require("./bookingDao");
const { passengerDao } = require("./passengerDao");

bookingDao.hasMany(passengerDao, {
  foreignKey: {
    name: "bookingId",
    field: "booking_id",
    allowNull: false,
  },
});
passengerDao.belongsTo(bookingDao, {
  foreignKey: {
    name: "bookingId",
    field: "booking_id",
    allowNull: false,
  },
});

module.exports = { bookingDao, passengerDao };
