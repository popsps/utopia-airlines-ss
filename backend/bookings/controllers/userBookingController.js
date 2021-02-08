const { userBookingService } = require("../services");

const userBookingController = {
  async getAll(req, res, next) {
    try {
      const bookings = await userBookingService.findAllUserBookings({
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
      const { user, body } = req;
      const data = ["ADMIN", "AGENT"].includes(user?.role.name)
        ? { ...body, agentId: user.id }
        : { ...body, userId: user.id, agentId: null };
      const booking = await userBookingService.createUserBooking(data);
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const { user, params:{ id } } = req;
      const booking = await userBookingService.findUserBookingById({
        id,
        userId: ["AGENT", "ADMIN"].includes(user?.role.name) ? null : user.id ?? 0,
      });
        
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },
};


module.exports = { userBookingController };