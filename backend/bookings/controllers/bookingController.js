const { bookingService } = require("../services");

const bookingController = {
  async getAll(req, res, next) {
    try {
      const bookings = await bookingService.findAllBookings({
        ...req.query,
        userId: req.user?.role.name === "CUSTOMER"
          ? req.user?.id
          :  null,
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
        case "CUSTOMER":
          return { ...body, contact: null, userId: user.id };
        case "AGENT":
          return { ...body, agent: user };
        default:
          return { ...body, userId: null };
        }
      })(req);
      const booking = await bookingService.createBooking(data);
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const { user, params:{ id } } = req;
      const booking = user 
        ? await bookingService.findBookingById({
          id,
          userId: ["AGENT", "ADMIN"].includes(user?.role.name) ? null : user.id ?? 0,
        })
        : await bookingService.findGuestBookingById({ id });
        
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