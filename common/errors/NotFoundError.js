const { StandardizedError } = require("./StandardizedError");

class NotFoundError extends StandardizedError {
  constructor(...resources) {
    super("Not Found", 404, ...resources.map(resource => ({message: resource})));
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}


module.exports = {NotFoundError};