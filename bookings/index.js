require("dotenv").config();
const express = require("express");
const BookingController = require("./controller/bookingController");

const PORT = process.env.PORT || process.argv[2] || 3000;
const app = express();
app.use(express.json());

app.use("/api/bookings", BookingController);
app.use((error, req, res, _next) => {
  const status = error.status || 400;
  res.status(status);
  res.json({
    status: status,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(PORT, () => console.log("Booking controller is running on " + PORT));
