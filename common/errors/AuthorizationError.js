const { StandardizedError } = require( "./StandardizedError");

class AuthorizationError extends StandardizedError {
  constructor() {
    super("Forbidden", 403);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

module.exports = {AuthorizationError};
