const { User } = require("@utopia-airlines-wss/common/models");
const { createJWTHandler } = require("@utopia-airlines-wss/common/util");
const {  BadRequestError } = require("@utopia-airlines-wss/common/errors");

const authJWTHandler = createJWTHandler({ privateKey: process.env.AUTH_JWT_PRIVATE_KEY });

const sessionService = {
  async createSession({ username, password }) {
    const user = await User.findOne({ where: { username } });
    if (user && await user.comparePassword(password))
      return await authJWTHandler.createJWT({ sub: user.id });
    throw new BadRequestError("invalid credentials");
  },
};

module.exports = sessionService;