const HttpError = require("./HttpError");

class ForbiddenError extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = ForbiddenError;