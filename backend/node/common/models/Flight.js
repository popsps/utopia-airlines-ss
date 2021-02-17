const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { removeUndefined } = require("../util");

class Flight extends Model {
  static associate({ Route, Airplane, Booking }) {
    Flight.belongsTo(Route, {
      foreignKey: {
        name: "routeId",
        field: "route_id",
        allowNull: false,
      },
      as: "route",
    });
    Flight.belongsTo(Airplane, {
      foreignKey: {
        name: "airplaneId",
        field: "airplane_id",
        allowNull: false,
      },
      as: "airplane",
    });
    Flight.belongsToMany(Booking, {
      through: "flight_bookings",
      foreignKey: "flight_id",
      otherKey: "booking_id",
      as: "bookings",
    });
    Flight.belongsToMany(Booking, {
      through: "flight_passengers",
      foreignKey: "flight_id",
      as: "passengers",
    });
  }
  toJSON(type){
    const { seatPrice, maxCapacity, reservedSeats, passengerCount, availableSeats, passengers, ...values } = this.get();
    if (values.route) delete values.routeId;
    if (passengers && type === "full") values.passengers = passengers;
    return {
      ...values,
      seats: removeUndefined({
        total: maxCapacity,
        reserved: type === "full" ? reservedSeats : null,
        booked : type === "full" ? passengerCount : null,
        available: availableSeats,
        price: seatPrice,
      }),
    };
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
  },
  reservedSeats: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  passengerCount: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  availableSeats: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
}, {
  tableName: "flight_status",
  freezeTableName: true,
  sequelize,
});

module.exports = { Flight };