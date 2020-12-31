const express = require("express");
const router = express.Router();
const bookingService = require("../service/bookingService");
const HttpError = require("../error/HttpError");

router.get("/", async (req, res, next) => {
  try {
    res.json(await bookingService.getAllBookings());
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});
router.get("/test", async (req, res, next) => {
  try {
    throw new HttpError(400, "Bad Request");
  } catch (err) {
    console.log("err:", err);
    next(err);
  }
});
router.get("/test2/t5", async (req, res, next) => {
  // throw "custom error 2";
  res.status(500).json("err");
});

router.post("/", async (req, res, next) => {
  try {
    const booking = req.body;
    const bookiningMade = await bookingService.makeBooking(booking);
    res.status(201).json(bookiningMade);
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