require("dotenv").config();
const express = require("express");
// const {sequelize} = require("@utopia-airlines-wss/common/db");
const { errorHandler } = require("@utopia-airlines-wss/common/middleware");
const PORT = process.env.PORT || 8090;

const app = express();


// const { Airport } = require("@utopia-airlines-wss/common/models/Airport");
// db.sequelize.sync();

// const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const { airportController } = require("./controller/airportController");

// app.get("/", airportController.getAll);




app.use(require("./routes"));

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
