const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class UserRole extends Model {
  static associate({ User }) {
    UserRole.hasMany(User, {
      foreignKey: {
        name:"roleId",
        field: "role_id",
        allowNull: false,
      },
      as: "users",
    });
  }

  toJSON() {
    return this.name;
  }
}

UserRole.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "user_role",
  freezeTableName: true,
  sequelize,
});

module.exports = { UserRole };