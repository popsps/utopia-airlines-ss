
const errors = {
  ...require("./StandardizedError"),
  ...require("./NotFoundError"),
  ...require("./BadRequestError"),
  ...require("./AuthenticationError"),
  ...require("./AuthorizationError"),
  ...require("./RequestValidationError"),
  handleMutationError(err) {
    if (err.original?.code === "ER_DUP_ENTRY") {
      throw new errors.StateConflictError(
        Object.keys(err.fields)
          .map((path) => path.match(/([^.]*)(?=_UNIQUE$)/)?.[0])
          .join(", ")
          + " already exists"
      );
    }
    else {
      console.error(err);
      throw new errors.BadRequestError("invalid user data");
    }
  },
};

module.exports = errors;