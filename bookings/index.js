const express = require("express");
const BookingController = require("./controller/bookingController");

const PORT = process.env.Port || 3000;
const app = express();
app.use(express.json());

app.use("/bookings", BookingController);
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});
app.listen(PORT, () => console.log("Booking controller is running on " + PORT));