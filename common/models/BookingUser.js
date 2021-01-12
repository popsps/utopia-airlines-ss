const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class BookingUser extends Model {
  static associate({ User }) {
    BookingUser.belongsTo(User, {
      foreignKey: {
        name: "userId",
        field: "user_id",
        allowNull: false,
      },
      as: "user",
    });
  }
  toJSON() {
    const { userId, user } = this.get();
    return user ?? userId;
  }
}

BookingUser.init ({
  bookingId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
}, {
  tableName: "booking_user",
  freezeTableName: true,
  sequelize,
});


module.exports = { BookingUser };