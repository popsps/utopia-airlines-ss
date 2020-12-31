const { bookingDao } = require("../dao");
const NotFoundError = require("../error/NotFoundError");

const bookingService = {
  validateBooking(_booking) {
    return true;
  },
  async getAllBookings() {
    const bookings = await bookingDao.findAll();
    return bookings;
  },
  async makeBooking(booking) {
    // const myBooking = bookingDao.build(booking);
    // console.log(myBooking instanceof bookingDao, myBooking);
    // const _booking = await bookingDao.create(booking);
    // return _booking;
    const _booking = await bookingDao.findOrCreate(
      { where: { id: booking.id }, defaults: booking });
    return _booking;

  },
  async findBookingById(id) {
    const booking = await bookingDao.findByPk(id);
    if (!booking) throw new NotFoundError(`cannot find #${id} booking`);
    return booking;
  },
  async updateBooking(id, booking) {
    /**
     * @type Model
     */
    const oldBooking = await this.findBookingById(id);
    if (!booking)
      throw new NotFoundError(`cannot find #${id} booking`);
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
      throw new NotFoundError(`cannot find #${id} booking`);
    const res = await booking.destroy();
    return res;
  },
};

module.exports = bookingService;