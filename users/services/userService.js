const { User, UserInfo } = require("@utopia-airlines-wss/common/models");
const { NotFoundError } = require("@utopia-airlines-wss/common/errors");

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
  async createUser({ roleId, username, password, info } = {}) {
    const user = await User.create({ roleId, username, password });
    if (info != null) {
      const { givenName, familyName, email, phone } = info;
      await UserInfo.create({
        userId: user.id,
        givenName,
        familyName,
        email,
        phone,
      });
    }
    return user;
  },
  async updateUser(userId, { roleId, username, password, info }) {
    const user = await userService.findUserById(userId);
    if (!user) throw new NotFoundError("cannot find user");
    Object.entries({ roleId, username, password })
      .filter(([, value]) => value != null)
      .forEach(([key, value]) => user[key] = value);
    await Promise.all([user.save(), info != null && UserInfo.upsert({ ...info, userId })]);
    return;
  },
  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError("cannot find user");
    await user.destroy();
  },
};

module.exports = userService;