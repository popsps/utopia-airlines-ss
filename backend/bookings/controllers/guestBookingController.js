const { guestBookingService } = require("../services");

const guestBookingController = {
  async getAll(req, res, next) {
    try {
      const bookings = await guestBookingService.findAllGuestBookings({
        ...req.query,
      });
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const data = (({ user, body }) => {
        switch (user?.role.name) {
        case "ADMIN":
        case "AGENT":
          return { ...body, userId: null, agentId: user.id };
        default:
          return { ...body, userId: null, agentId: null  };
        }
      })(req);
      const booking = await guestBookingService.createGuestBooking(data);
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const { params:{ id } } = req;
      const booking = await guestBookingService.findGuestBookingById({
        id,
      });
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },
  async updateById(req, res, next) {
    try {
      const booking = await guestBookingService.updateBooking(req.params.id, req.body);
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },
};


module.exports = { guestBookingController };