const { StandardizedError } = require("./StandardizedError");

class RequestValidationError extends StandardizedError {
  constructor(errors) {
    super(
      "Invalid data",
      400,
      ...errors.map(({ msg: message, param, location }) => ({ message, param, location }))
    );
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

module.exports = { RequestValidationError };