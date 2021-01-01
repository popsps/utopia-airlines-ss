const { Airport } = require("./Airport");
const { Route } = require("./Route");
const { UserRole } = require("./UserRole");
const { User } = require("./User");
const { UserInfo } = require("./UserInfo");
const { Booking } = require("./Booking");
const { Passenger } = require("./Passenger");

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

User.hasMany(Booking,{
  foreignKey: {
    name: "bookerId",
    field: "booker_id",
    allowNull: false,
  },
  as: "bookings",
});
Booking.hasOne(User,{
  foreignKey: {
    name: "bookerId",
    field: "booker_id",
    allowNull: false,
  },
  as: "booker",
});

Booking.hasMany(Passenger, {
  foreignKey: {
    name: "bookingId",
    field: "booking_id",
    allowNull: false,
  },
  as: "passengers",
});
Passenger.hasOne(Booking, {
  foreignKey: {
    name: "bookingId",
    field: "booking_id",
    allowNull: false,
  },
  as: "booking",
});

module.exports = {
  Airport,
  Route,
  UserRole,
  User,
  UserInfo,
  Booking,
  Passenger,
};