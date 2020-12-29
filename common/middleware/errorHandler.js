const { StandardizedError } = require("../errors");

module.exports = ( err, req, res, _next ) => {
  if (err instanceof StandardizedError) {
    res.status(err.status).json(err);
  } else {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};