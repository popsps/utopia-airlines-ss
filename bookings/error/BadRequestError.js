const HttpError = require("./HttpError");

class BadRequestError extends HttpError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = BadRequestError;