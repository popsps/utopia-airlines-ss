const {Model, DataTypes} = require("sequelize");

class UserRole extends Model {}

UserRole.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "user_role",
  timestamps: false,
  freezeTableName: true,
});

module.exports = UserRole;