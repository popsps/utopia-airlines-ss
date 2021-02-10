const { AuthenticationError, AuthorizationError } = require("../errors");

const requireAuthentication = ({ roles, errorMessage, condition = true } = {}) => {
  const shouldCheckAuthentication = typeof condition === "function"
    ? condition
    : () => condition;
  const checkRole = (role) => roles && !roles.includes(role);
  return(req, res, next) => {
    if (shouldCheckAuthentication(req)) {
      if (!req.user) throw new AuthenticationError();
      if (checkRole(req.user?.role.name)) 
        throw new AuthorizationError(errorMessage);
    }
    next();
  };
};

module.exports = { requireAuthentication };