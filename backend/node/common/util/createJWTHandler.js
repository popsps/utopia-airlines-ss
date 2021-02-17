const jwt = require("jsonwebtoken");

const createJWTHandler = ({ privateKey, publicKey }) => {
  const handler = {};
  if (privateKey != null)
    handler.createJWT= (payload) => new Promise(
      (resolve, reject) => jwt.sign(payload, privateKey, { algorithm: "RS256" }, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      })
    );
  if (publicKey != null)
    handler.verifyJWT = (token) => new Promise(
      (resolve, reject) => jwt.verify(token, publicKey, { algorithm: "RS256" }, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      })
    );
  return handler;
};

module.exports = {
  createJWTHandler,
};