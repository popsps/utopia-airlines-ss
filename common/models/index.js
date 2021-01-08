// Booking.belongsTo(User,{
//   foreignKey: {
//     name: "bookerId",
//     field: "booker_id",
//     allowNull: false,
//   },
//   as: "booker",
// });

const models = {
  ...require("./Airport"),
  ...require("./Route"),
  ...require("./Flight"),
  ...require("./UserRole"),
  ...require("./User"),
  ...require("./Booking"),
  ...require("./Passenger"),
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = models;