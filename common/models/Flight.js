const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Flight extends Model {
  static associate({ Route, Booking }) {
    Flight.belongsTo(Route, {
      foreignKey: {
        name: "routeId",
        field: "route_id",
        allowNull: false,
      },
      as: "route",
    });
    Flight.belongsToMany(Booking, {
      through: "flight_bookings",
      foreignKey: "flight_id",
      otherKey: "booking_id",
      as: "bookings",
    });
  }
}

Flight.init({
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  seatPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  maxCapacity: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  reservedSeats: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  passengerCount: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: "flight_status",
  freezeTableName: true,
  sequelize,
});

module.exports = { Flight };