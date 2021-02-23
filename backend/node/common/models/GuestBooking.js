const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class GuestBooking extends Model {
  static associate({ User, Flight, Passenger }) {
    GuestBooking.belongsTo(User, {
      foreignKey: {
        name: "agentId",
        field: "agent_id",
      },
      as: "agent",
    });
    GuestBooking.belongsToMany(Flight, {
      through: "flight_bookings",
      foreignKey: "booking_id",
      otherKey: "flight_id",
      as: "flights",
    });
    GuestBooking.hasMany(Passenger, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "passengers",
    });
  }
  toJSON(){
    const { contactEmail: email, contactPhone: phone, ...values } = Object.assign({}, this.get());
    delete values.confirmationCode;
    values.agentId ?? delete values.agentId;
    values.agent ?? delete values.agent;
    if (values.agent) delete values.agentId;
    return { type: "GUEST", ...values, guest: { email, phone } };
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

