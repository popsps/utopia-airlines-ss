const models = {
  ...require("./Airport"),
  ...require("./Route"),
  ...require("./Flight"),
  ...require("./UserRole"),
  ...require("./User"),
  ...require("./Booking"),
  ...require("./BookingGuest"),
  ...require("./BookingAgent"),
  ...require("./BookingUser"),
  ...require("./GuestBooking"),
  ...require("./UserBooking"),
  ...require("./Passenger"),
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = models;