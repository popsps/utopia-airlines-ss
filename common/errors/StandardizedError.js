
class StandardizedError extends Error {
  constructor(message, status, ...errors) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, StandardizedError.prototype);
  }

  toJson() {
    const jsonObj = {};
    if (this.message) jsonObj.message = this.message;
    if (this.errors.length) jsonObj.errors = this.errors;
    return JSON.stringify(jsonObj);
  }
}

module.exports = {StandardizedError};