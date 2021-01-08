const { Airport } = require("./Airport");
const { Route } = require("./Route");
const { Flight } = require("./Flight");
const { UserRole } = require("./UserRole");
const { User } = require("./User");
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
Route.hasMany(Flight, {
  foreignKey: {
    name: "routeId",
    field: "route_id",
    allowNull: false,
  },
  as: "flights",
});
Flight.belongsTo(Route, {
  foreignKey: {
    name: "routeId",
    field: "route_id",
    allowNull: false,
  },
  as: "route",
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

User.hasMany(Booking,{
  foreignKey: {
    name: "bookerId",
    field: "booker_id",
    allowNull: false,
  },
  as: "bookings",
});
Booking.belongsTo(User,{
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
Passenger.belongsTo(Booking, {
  foreignKey: {
    name: "bookingId",
    field: "booking_id",
    allowNull: false,
  },
  as: "booking",
});

Flight.belongsToMany(Booking, {
  through: "flight_bookings",
  foreignKey: "flight_id",
  otherKey: "booking_id",
  as: "bookings",
});
Booking.belongsToMany(Flight, {
  through: "flight_bookings",
  foreignKey: "booking_id",
  otherKey: "flight_id",
  as: "flights",
});

module.exports = {
  Airport,
  Route,
  Flight,
  UserRole,
  User,
  Booking,
  Passenger,
};