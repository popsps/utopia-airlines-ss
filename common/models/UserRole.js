const {Model, DataTypes} = require("sequelize");
const {sequelize} = require("../db");

class UserRole extends Model {}

UserRole.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "user_role",
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  sequelize,
});

module.exports = UserRole;