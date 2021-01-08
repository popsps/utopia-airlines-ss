const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class GuestBooking extends Model {
  static associate({ User, Passenger }) {
    GuestBooking.belongsTo(User, {
      foreignKey: {
        name: "bookerId",
        field: "booker_id",
      },
      as: "booker",
    });
    GuestBooking.hasMany(Passenger, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
      },
      as: "passengers",
    });
  }
  toJSON(){
    const values = Object.assign({}, this.get());
    delete values.confirmationCode;
    values.bookerId ?? delete values.bookerId;
    return values;
  }
}

GuestBooking.init({
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  confirmationCode: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "guest_booking",
  freezeTableName: true,
  sequelize,
});

module.exports = { GuestBooking };