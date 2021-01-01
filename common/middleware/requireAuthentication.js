const { AuthenticationError } = require("../errors");

/**
 * 
 * @param  {...string} roles 
 */
const requireAuthentication = (...roles) => async (req, res, next) => {
  if (!roles.includes(req.user?.role.name)) {
    throw new AuthenticationError();
  }
  next();
};

module.exports = { requireAuthentication };