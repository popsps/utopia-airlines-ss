module.exports = {
  ...require("./StandardizedError"),
  ...require("./NotFoundError"),
  ...require("./BadRequestError"),
  ...require("./AuthenticationError"),
  ...require("./AuthorizationError"),
};