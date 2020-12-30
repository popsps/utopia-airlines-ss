const express = require("express");
const router = express.Router();
const bookingService = require("../service/bookingService");

router.get("/", async (req, res) => {
  try {
    res.json(await bookingService.getAllBookings());
  } catch (err) {
    console.log("err:", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const booking = req.body;
    res.json(await bookingService.makeABooking(booking));
  } catch (err) {
    console.log("err:", err);
  }
});

module.exports = router;