const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

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
  }
  toJSON(){
    const values = this.get();
    if (values.route) delete values.routeId;
    return values;
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