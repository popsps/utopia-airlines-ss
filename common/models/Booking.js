const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Booking extends Model {
  static associate({ Flight, Passenger, BookingGuest, BookingAgent, BookingUser }) {
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
  }
  toJSON(){
    const values = Object.assign({}, this.get());
    delete values.confirmationCode;
    delete values.guest;
    delete values.booker;
    delete values.user;
    return values;
  }
}

Booking.init ({
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
