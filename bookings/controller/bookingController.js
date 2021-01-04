const express = require("express");
const router = express.Router();
const bookingService = require("../service/bookingService");
const { HttpError, BadRequestError } = require("../error");


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
    if (!bookingService.validateBooking(booking))
      throw new BadRequestError("Bad input");
    const bookingMade = await bookingService.makeBooking(booking);
    if (bookingMade[1] === true)
      res.status(201).json(bookingMade[0]).json(bookingMade[2]);
    else
      throw new HttpError(409, "The booking already exists");
  } catch (err) {
    console.log(err);
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
    if (!bookingService.validateBooking(booking))
      throw new BadRequestError("Bad input");
    res.json(await bookingService.updateBooking(id, booking));
  } catch (err) {
    next(err);
  }
});


module.exports = router;