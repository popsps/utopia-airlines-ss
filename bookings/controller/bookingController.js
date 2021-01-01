const express = require("express");
const router = express.Router();
const bookingService = require("../service/bookingService");
// eslint-disable-next-line no-unused-vars
const { HttpError } = require("../error");


router.get("/", async (req, res, next) => {
  try {
    const bookerId = req.query.bookerId;
    const isActive = req.query.isActive;
    const bookings = await bookingService.getAllBookings({ bookerId, isActive });
    res.status(200).json(bookings);
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const booking = req.body;
    const bookingMade = await bookingService.makeBooking(booking);
    if (bookingMade[1] === true)
      res.status(201).json(bookingMade[0]);
    else
      throw new HttpError(409, "The booking already exists");
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await bookingService.findBookingById(id));
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await bookingService.deleteBookingById(id));
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const booking = req.body;
    res.json(await bookingService.updateBooking(id, booking));
  } catch (err) {
    next(err);
  }
});


module.exports = router;