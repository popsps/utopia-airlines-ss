const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class UserBooking extends Model {
  static associate({ User, Flight, Passenger }) {
    UserBooking.belongsTo(User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
      as: "user",
    });
    UserBooking.belongsTo(User, {
      foreignKey: {
        name: "agentId",
        field: "agent_id",
      },
      as: "agent",
    });
    UserBooking.belongsToMany(Flight, {
      through: "flight_bookings",
      foreignKey: "booking_id",
      otherKey: "flight_id",
      as: "flights",
    });
    UserBooking.hasMany(Passenger, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "passengers",
    });
  }
  toJSON(){
    const values = Object.assign({}, this.get());
    delete values.confirmationCode;
    values.userId ?? delete values.userId;
    values.user ?? delete values.user;
    if (values.user) delete values.userId;
    values.agentId ?? delete values.agentId;
    values.agent ?? delete values.agent;
    if (values.agent) delete values.agentId;
    return { type: "USER", ...values };
  }
}

UserBooking.init({
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  confirmationCode: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: "user_booking",
  freezeTableName: true,
  sequelize,
});
module.exports = { UserBooking };