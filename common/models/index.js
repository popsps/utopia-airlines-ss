const UserRole = require("./UserRole");
const User = require("./User");
const UserInfo = require("./UserInfo");

UserRole.hasMany(User, {foreignKey: {name:"roleId", field: "role_id", allowNull: false}});
User.belongsTo(UserRole);

User.hasOne(UserInfo, {foreignKey: {name:"userId", field: "user_id", allowNull: false} });
UserInfo.belongsTo(User);

module.exports = {
  UserRole,
  User,
  UserInfo,
};