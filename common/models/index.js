const { UserRole } = require("./UserRole");
const { User } = require("./User");
const { UserInfo } = require("./UserInfo");

UserRole.hasMany(User, { foreignKey: { name:"roleId", field: "role_id", allowNull: false }, as: "users" });
User.belongsTo(UserRole, { foreignKey: { name:"roleId", field: "role_id", allowNull: false }, as: "role" });

User.hasOne(UserInfo, { foreignKey: { name:"userId", field: "user_id", allowNull: false }, as: "info" });
UserInfo.belongsTo(User, { foreignKey: { name:"userId", field: "user_id", allowNull: false } });

module.exports = {
  UserRole,
  User,
  UserInfo,
};