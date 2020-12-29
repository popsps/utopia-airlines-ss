const { StandardizedError } = require("./StandardizedError");

class AuthenticationError extends StandardizedError {
  constructor() {
    super("Unauthorized ", 401);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

module.exports = {AuthenticationError};