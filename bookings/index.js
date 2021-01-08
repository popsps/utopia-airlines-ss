require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || process.argv[2] || 3000;

const { errorHandler } = require("@utopia-airlines-wss/common/middleware");

const app = express();

app.use(express.json());

app.use(require("./routes"));

app.use(errorHandler);

app.listen(PORT, () => console.log("Booking controller is running on " + PORT));
