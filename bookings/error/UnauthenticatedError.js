const HttpError = require("./HttpError");

class UnauthenticatedError extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = UnauthenticatedError;