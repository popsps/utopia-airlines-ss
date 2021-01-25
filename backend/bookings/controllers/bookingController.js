const { bookingService } = require("../services");

const bookingController = {
  async getAll(req, res, next) {
    try {
      const bookings = await bookingService.findAllBookings({
        ...req.query,
      });
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const { params:{ id } } = req;
      const booking = await bookingService.findBookingById({
        id,
      });
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },
  async deleteById(req, res, next) {
    try {
      await bookingService.deleteBookingById(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};


module.exports = { bookingController };