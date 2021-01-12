const { bookingService } = require("../services");

const bookingController = {
  async getAll(req, res, next) {
    try {
      const bookings = await bookingService.findAllBookings(req.query);
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const booking = await bookingService.createBooking(
        (({ user, body }) => {
          switch (user?.role.name) {
          case "CUSTOMER":
            return { ...body, contact: user };
          case "AGENT":
            return { ...body, agent: user };
          default:
            return body;
          }
        })(req)
      );
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const booking = await bookingService.findBookingById(
        (({ user, params: { id } }) => {
          switch (user?.role.name) {
          case "AGENT":
          case "ADMIN":
            return {
              id,
              userId: null,
            };
          case "CUSTOMER":
            return {
              id,
              userId: user.id,
            };
          default:
            return { id };
          }
        })(req));
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },
  async updateById(req, res, next) {
    try {
      const booking = await bookingService.updateBooking(req.params.id, req.body);
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