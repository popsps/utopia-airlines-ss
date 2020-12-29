const { StandardizedError } = require("../errors");

module.exports = ( err, req, res, _next ) => {
  if (err instanceof StandardizedError) {
    res.status(err.status).json(err.toJson());
  } else {
    res.status(500).send({ message: err.message });
  }
};