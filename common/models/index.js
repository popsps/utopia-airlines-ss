const { UserRole } = require("./UserRole");
const { User } = require("./User");
const { UserInfo } = require("./UserInfo");
const { Airport } = require("./Airport");
const { Route } = require("./Route");

UserRole.hasMany(User, {
  foreignKey: {
    name:"roleId",
    field: "role_id",
    allowNull: false,
  },
  as: "users",
});
User.belongsTo(UserRole, {
  foreignKey: {
    name:"roleId",
    field: "role_id",
    allowNull: false,
  },
  as: "role",
});

User.hasOne(UserInfo, {
  foreignKey: {
    name:"userId",
    field: "user_id",
    allowNull: false,
  },
  as: "info",
});
UserInfo.belongsTo(User, {
  foreignKey: {
    name:"userId",
    field: "user_id",
    allowNull: false,
  },
});

Airport.hasMany(Route, {
  foreignKey: {
    name: "originId",
    field: "origin_id",
    allowNull: false,
  },
  as: "departureRoutes",
});
Route.belongsTo(Airport, {
  foreignKey: {
    name: "originId",
    field: "origin_id",
    allowNull: false,
  },
  as: "origin",
});
Airport.hasMany(Route, {
  foreignKey: {
    name: "destinationId",
    field: "destination_id",
    allowNull: false,
  },
  as: "arrivalRoutes",
});
Route.belongsTo(Airport, {
  foreignKey: {
    name: "destinationId",
    field: "destination_id",
    allowNull: false,
  },
  as: "destination",
});

module.exports = {
  UserRole,
  User,
  UserInfo,
  Airport,
  Route,
};