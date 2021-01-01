const { AuthenticationError, AuthorizationError } = require("../errors");

const requireAuthentication = ({ roles, errorMessage }) => (req, res, next) => {
  if (!res.user) throw new AuthenticationError();
  if (!roles.includes(req.user.role.name)) 
    throw new AuthorizationError(errorMessage);
  next();
};

module.exports = { requireAuthentication };