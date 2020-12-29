const {Model, DataTypes} = require("sequelize");

class UserRole extends Model {}

UserRole.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = UserRole;