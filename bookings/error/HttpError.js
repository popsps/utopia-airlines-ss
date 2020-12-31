class HttpError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    this.stack = super.stack;
  }
}

module.exports = HttpError;