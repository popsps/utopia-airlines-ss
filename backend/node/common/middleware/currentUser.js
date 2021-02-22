const { User } = require("../models");
const { createJWTHandler } = require("../util");

const authJWTHandler = createJWTHandler({ publicKey: process.env.AUTH_JWT_PUBLIC_KEY });

const getCurrentUser = async (req, res, next) => {
  try {
    if (req.session?.jwt) {
      const payload = await authJWTHandler.verifyJWT(req.session.jwt);
      req.user = await User.findByPk(Number.parseInt(payload.sub, 16), { include: ["role"] });
    }
    next();
  } catch (err) {
    console.log({ err });
    next(err);
  }
};

module.exports = { getCurrentUser };
