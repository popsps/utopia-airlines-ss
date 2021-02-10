const express = require("express");
const { errorHandler } = require("@utopia-airlines-wss/common/middleware");

const app = express();

app.use(
  express.json(),
  require("./routes"),
  errorHandler
);

module.exports = { app };