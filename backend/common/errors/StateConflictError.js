const { StandardizedError } = require("./StandardizedError");

class StateConflictError extends StandardizedError {
  constructor(message) {
    super(message, 409, { message });
    Object.setPrototypeOf(this, StateConflictError.prototype);
  }
}

module.exports = { StateConflictError };