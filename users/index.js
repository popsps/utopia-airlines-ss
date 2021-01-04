require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || process.argv[2] || 3000;

const { getCurrentUser, errorHandler } = require("@utopia-airlines-wss/common/middleware");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieSession({
  name: "session",
  httpOnly: true,
  signed: false,
}));

app.use(getCurrentUser);
app.use(require("./routes"));

app.use(errorHandler);

app.listen(PORT, () => console.log("App listening on " + PORT));