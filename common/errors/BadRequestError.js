const { StandardizedError } = require("./StandardizedError");

class BadRequestError extends StandardizedError {
  constructor(message) {
    super(message, 400, { message });
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

module.exports = { BadRequestError };