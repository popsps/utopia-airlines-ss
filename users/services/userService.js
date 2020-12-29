const {User, UserRole, UserInfo} = require("@utopia-airlines-wss/common/models");
const {NotFoundError} = require("@utopia-airlines-wss/common/errors");

const userService = {
  async findAllUsers({roleId} = {}) {
    const query = {};
    if (roleId != null) query.roleId = roleId;
    return User.findAll({where: query, include: [UserRole, UserInfo]});
  },
  async findUserById(userId) {
    const user = await User.findByPk(userId, {include: [UserRole, UserInfo]});
    if (!user) throw new NotFoundError("cannot find user");
    return user;
  },
  async createUser({roleId, username, password, userInfo} = {}) {
    const user = User.create({roleId, username, password});
    if (userInfo != null) {
      const {givenName, familyName, email, phone} = userInfo;
      UserInfo.create({userId: user.id, givenName, familyName, email, phone});
    }
  },
  async updateUser(userId, {roleId, password, userInfo}) {
    try {
      const user = await userService.findUserById(userId);
      if (!user) throw new NotFoundError("cannot find user");
      if (roleId != null)
        user.roleId = roleId;
      if (password != null)
        user.password = password;
      const promises = [user.save()];
      if (userInfo != null) {
        const {givenName, familyName, email, phone} = userInfo;
        promises.push(UserInfo.upsert({userId,givenName, familyName, email, phone }));
      }
      await Promise.all(promises);
      return;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userService;