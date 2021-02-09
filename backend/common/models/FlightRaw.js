const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class FlightRaw extends Model {
  static associate({ Route, Airplane, Booking }) {
    FlightRaw.belongsTo(Route, {
      foreignKey: {
        name: "routeId",
        field: "route_id",
        allowNull: false,
      },
      as: "route",
    });
    FlightRaw.belongsTo(Airplane, {
      foreignKey: {
        name: "airplaneId",
        field: "airplane_id",
        allowNull: false,
      },
      as: "airplane",
    });
    FlightRaw.belongsToMany(Booking, {
      through: "flight_bookings",
      foreignKey: "flight_id",
      otherKey: "booking_id",
      as: "bookings",
    });
  }
  toJSON(){
    const { seatPrice, reservedSeats, ...values } = this.get();
    if (values.route) delete values.routeId;
    return {
      ...values,
      seats: {
        reserved: reservedSeats,
        price: seatPrice,
      },
    };
  }
}

FlightRaw.init({
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reservedSeats: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  seatPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "flight",
  freezeTableName: true,
  sequelize,
});

module.exports = { FlightRaw };