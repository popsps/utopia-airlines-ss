const { User } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");


const userService = {
  async findAllUsers({ roleId } = {}) {
    const query = {};
    if (roleId != null) query.roleId = roleId;
    return User.findAll({
      where: query,
      include: "role",
    });
  },
  async findUserById(userId) {
    const user = await User.findByPk(userId, { include: "role" });
    if (!user) throw new NotFoundError("cannot find user");
    return user;
  },
  async createUser({ roleId = 2, username, password, email, phone, name } = {}) {
    try {
      const user = await User.create({
        roleId,
        username,
        password,
        email,
        phone,
        givenName: name.given,
        familyName: name.family,
      });
      return user;
    } catch (err) {
      handleMutationError(err);
    }
  },
  async updateUser(userId, { roleId, username, password, email, phone, name }) {
    const user = await userService.findUserById(userId);
    try {
      await user.update(
        Object.entries({
          roleId,
          username,
          password,
          email,
          phone,
          givenName: name.given,
          familyName: name.family,
        }).filter(([, value]) => value != null)
          .reduce((query, [key, value]) => query[key] = value, {})
      );
    } catch (err) {
      handleMutationError(err);
    }
  },
  async deleteUser(userId) {
    const user = await userService.findUserById(userId);
    await user.destroy();
  },
};

module.exports = userService;