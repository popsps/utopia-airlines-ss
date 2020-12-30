const { sequelize } = require("@utopia-airlines-wss/common/db");
const { User, UserInfo } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, BadRequestError } = require("@utopia-airlines-wss/common/errors");
const { StateConflictError } = require("@utopia-airlines-wss/common/errors/StateConflictError");

const handleMutationError = (err) => {
  console.error(err);
  if (err.original?.code === "ER_DUP_ENTRY") {
    throw new StateConflictError(
      Object.keys(err.fields)
        .map((path) => path.match(/([^.]*)(?=_UNIQUE$)/)?.[0])
        .join(", ")
          + " already exists"
    );
  }
  else
    throw new BadRequestError("invalid user data");
};

const userService = {
  async findAllUsers({ roleId } = {}) {
    const query = {};
    if (roleId != null) query.roleId = roleId;
    return User.findAll({
      where: query,
      include: ["role", "info"],
    });
  },
  async findUserById(userId) {
    const user = await User.findByPk(userId, { include: ["role", "info"] });
    if (!user) throw new NotFoundError("cannot find user");
    return user;
  },
  async createUser({ roleId = 2, username, password, info } = {}) {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create({ roleId, username, password });
      if (info != null) {
        await UserInfo.create({
          userId: user.id,
          givenName: info.name.given,
          familyName: info.name.family,
          email: info.email,
          phone: info.phone,
        });
      }
      await transaction.commit();
      return user;
    } catch (err) {
      await transaction.rollback();
      handleMutationError(err);
    }
  },
  async updateUser(userId, { roleId, username, password, info }) {
    const user = await userService.findUserById(userId);
    if (!user) throw new NotFoundError("cannot find user");
    const transaction = await sequelize.transaction();
    try {
      Object.entries({ roleId, username, password })
        .filter(([, value]) => value != null)
        .forEach(([key, value]) => user[key] = value);
      await user.save();
      if (info != null) {
        const userInfo = await UserInfo.findByPk(userId);
        const newInfo = {
          givenName: info.name?.given,
          familyName: info.name?.family,
          email: info.email,
          phone: info.phone,
        };
        if (userInfo) userInfo.update(newInfo);
        else await UserInfo.create({
          userId,
          ...newInfo,
        });
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      handleMutationError(err);
    }
  },
  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError("cannot find user");
    await user.destroy();
  },
};

module.exports = userService;