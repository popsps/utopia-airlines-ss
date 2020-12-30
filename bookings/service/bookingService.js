const bookingDao = require("../dao/bookingDao");

const bookingService = {
  async getAllBookings() {
    // eslint-disable-next-line no-useless-catch
    try {
      const bookings = await bookingDao.findAll();
      return bookings;
    } catch (err) {
      throw err;
    }
  },
  async makeABooking(booking) {
    // eslint-disable-next-line no-useless-catch
    try {
      const _booking = await bookingDao.findOrCreate(
        { where: { id: booking.id } });
      console.log("booking:", _booking);
      return _booking;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = bookingService;