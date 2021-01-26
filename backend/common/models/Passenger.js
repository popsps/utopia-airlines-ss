const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Passenger extends Model {
  static associate({ Booking }) {
    Passenger.belongsTo(Booking, {
      foreignKey: {
        name: "bookingId",
        field: "booking_id",
        allowNull: false,
      },
      as: "booking",
    });
  }
  toJSON(type){
    const { id, bookingId, givenName: given, familyName: family, ...values } = this.get();
    if (type !== "full") return { name: { given, family } };
    return  {
      id,
      bookingId,
      name: { given, family },
      ...values,
    };
  }
}

Passenger.init({
  givenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "passenger",
  freezeTableName: true,
  sequelize,
});

module.exports = { Passenger };
