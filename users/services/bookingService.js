const { Booking } = require("@utopia-airlines-wss/common/models");

const bookingService = {
  async getBookingsForUser(user) {
    return await Booking.findAll({ where: { bookerId: user.id } });
  },
};

module.exports = bookingService;