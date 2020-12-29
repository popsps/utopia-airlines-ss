require("dotenv").config();
const express = require("express");
const {sequelize} = require("@utopia-airlines-wss/common/db");
const {errorHandler} = require("@utopia-airlines-wss/common/middleware");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(require("./routes"));

app.use(errorHandler);

sequelize.sync({force: false}).then (() => {
  app.listen(PORT, () => console.log("App listening on " + PORT));
});