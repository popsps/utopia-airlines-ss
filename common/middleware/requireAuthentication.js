const { Op } = require("sequelize");
const { AuthenticationError } = require("../errors");
const { UserRole } = require("../models");

/**
 * 
 * @param  {...string} roles 
 */
const requireAuthentication = (...roles) => {
  const roleIds = UserRole.findAll({
    where: {
      [Op.or]: roles.map(name => ({ name })),
    },
    attributes: ["id"],
  }).then((userRoles) => userRoles.map(({ id }) => id));
  return async (req, res, next) => {
    if (!(await roleIds).includes(req.user?.roleId)) {
      throw new AuthenticationError();
    }
    next();
  };
};

module.exports = { requireAuthentication };