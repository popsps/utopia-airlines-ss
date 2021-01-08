const { Router } = require("express");
const router = Router();

const { BadRequestError } = require("@utopia-airlines-wss/common/errors");

const bookingService = require("../service/bookingService");


router.get("/", async (req, res, next) => {
  try {
    const bookings = await bookingService.findAllBookings(req.query);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    if (!bookingService.validateBooking(req.body))
      throw new BadRequestError("Bad input");
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await bookingService.findBookingById(req.params.id);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    if (!bookingService.validateBooking(req.body))
      throw new BadRequestError("Bad input");
    const booking = await bookingService.updateBooking(req.params.id, req.body);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await bookingService.deleteBookingById(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


module.exports = router;