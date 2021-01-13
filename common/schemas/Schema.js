class Schema {
  static getRequired({ optional, errorMessage }) {
    if (optional) return { optional: true };
    else return {
      exists: {
        errorMessage,
        bail: true,
      },
    };
  }
}

module.exports = { Schema };