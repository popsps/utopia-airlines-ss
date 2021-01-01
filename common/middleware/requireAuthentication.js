const { AuthenticationError, AuthorizationError } = require("../errors");

const requireAuthentication = ({ roles, errorMessage, condition }) => (req, res, next) => {
  if (typeof condition === "function"? condition(req): condition) {
    if (!res.user) throw new AuthenticationError();
    if (!roles.includes(req.user.role.name)) 
      throw new AuthorizationError(errorMessage);
  }
  next();
};

module.exports = { requireAuthentication };