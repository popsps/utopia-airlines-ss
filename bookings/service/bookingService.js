const bookingDao = require("../dao/bookingDao");


exports.getAllBookings = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const bookings = await bookingDao.findAll();
    return bookings;
  } catch (err) {
    throw err;
  }
};

exports.makeABooking = async (booking) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const _booking = await bookingDao.findOrCreate(
      { where: { id: booking.id } });
    console.log("booking:", _booking);
    return _booking;
  } catch (err) {
    throw err;
  }
};