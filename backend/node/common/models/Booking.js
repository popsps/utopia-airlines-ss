const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Booking extends Model {
  static associate({ BookingGuest, BookingAgent, BookingUser, Flight, FlightRaw, Passenger }) {

    Booking.hasOne(BookingGuest, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "guest",
    });
    Booking.hasOne(BookingAgent, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "agent",
    });
    Booking.hasOne(BookingUser, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "user",
    });
    Booking.belongsToMany(Flight, {
      through: "flight_bookings",
      foreignKey: "booking_id",
      otherKey: "flight_id",
      as: "flights",
    });
    Booking.hasMany(Passenger, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "passengers",
    });
  }

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.confirmationCode;
    values.agent ?? delete values.agent;
    values.user ?? delete values.user;
    values.guest ?? delete values.guest;
    return values;
  }
}

Booking.init({
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  confirmationCode: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  type: {
    type: DataTypes.VIRTUAL,
    get() {
      const [hasGuest, hasUser] = [this.guest, this.user].map(value => value !== undefined);
      if (hasGuest && hasUser) {

        if (this.guest && !this.user)
          return "GUEST";
        if (!this.guest && this.user)
          return "USER";
      }
    },
  },
}, {
  tableName: "booking",
  freezeTableName: true,
  sequelize,
});


module.exports = { Booking };
