const HttpError = require("./HttpError");

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(403, message);
  }
}

module.exports = UnauthorizedError;