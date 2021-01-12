const { AuthenticationError, AuthorizationError } = require("../errors");

const requireAuthentication = ({ roles, errorMessage, condition = true } = {}) => (req, res, next) => {
  if ((typeof condition === "function"? condition(req): condition)) {
    if (!req.user) throw new AuthenticationError();
    if (roles && !roles.includes(req.user.role.name)) 
      throw new AuthorizationError(errorMessage);
  }
  next();
};

module.exports = { requireAuthentication };