const bookingDao = require("../dao/bookingDao");
const { NotFoundError } = require("../../common/errors/NotFoundError");

const bookingService = {
  async getAllBookings() {
    const bookings = await bookingDao.findAll();
    return bookings;
  },
  async makeBooking(booking) {
    const myBooking = bookingDao.build(booking);
    console.log(myBooking instanceof bookingDao);
    const _booking = await bookingDao.findOrCreate(
      { where: { id: booking.id }, defaults: booking });

    // const _booking = await bookingDao.create(booking);
    console.log("booking:", _booking);
    return _booking[0];
    // return _booking;
  },
  async findBookingById(id) {
    const booking = await bookingDao.findByPk(id);
    if (!booking) throw new NotFoundError("cannot find the booking");
    return booking;
  },
  async updateBooking(id, booking) {
    /**
     * @type Model
     */
    const oldBooking = await this.findBookingById(id);
    // const { bookerId, isActive } = booking;
    const newBooking = await oldBooking.update(booking);
    return newBooking;
  },
  async deleteBookingById(id) {
    /**
     * @type Model
     */
    const booking = await bookingDao.findByPk(id);
    if (!booking)
      throw new NotFoundError("cannot find the booking");
    const res = await booking.destroy();
    return res;
  },
};

module.exports = bookingService;