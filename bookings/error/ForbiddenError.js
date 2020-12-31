const HttpError = require("./HttpError");

class ForbiddenError extends HttpError {
  constructor(message) {
    super(403, message);
  }
}

module.exports = ForbiddenError;