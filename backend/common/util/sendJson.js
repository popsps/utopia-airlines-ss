const { createReplacer } = require("./createReplacer");
const sendJson = ({ req, res, status = 200, data, toJSON: { type } = {} }) => {
  res.setHeader("Content-Type", "application/json");
  res.status(status).end(JSON.stringify(
    data,
    createReplacer({
      type: type ?? ["ADMIN", "AGENT"].includes(req.user?.role.name) ? "full" : "slim",
    })
  ));
};
module.exports = { sendJson };