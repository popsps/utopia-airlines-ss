const express = require("express");
const router = express.Router();
const bookingService = require("../service/bookingService");

router.get("/", async (req, res, next) => {
  try {
    res.json(await bookingService.getAllBookings());
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const booking = req.body;
    res.json(await bookingService.makeBooking(booking));
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await bookingService.findBookingById(id));
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await bookingService.deleteBookingById(id));
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const booking = req.body;
    res.json(await bookingService.updateBooking(id, booking));
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});

module.exports = router;