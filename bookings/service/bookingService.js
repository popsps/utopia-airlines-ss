// eslint-disable-next-line no-unused-vars
const { bookingDao, passengerDao } = require("../dao");
const NotFoundError = require("../error/NotFoundError");

const bookingService = {
  validateBooking(_booking) {
    return true;
  },
  async getAllBookings(query = null) {
    const filter = {};
    if (query.bookerId)
      filter.bookerId = parseInt(query.bookerId);
    if (query.isActive)
      filter.isActive = (query.isActive == "true") ? true : false;
    const bookings = await bookingDao.findAll({ where: filter });
    return bookings;
  },
  async makeBooking(booking) {
    // const myBooking = bookingDao.build(booking);
    // console.log(myBooking instanceof bookingDao, myBooking);
    // const _booking = await bookingDao.create(booking);
    // return _booking;
    const _booking = await bookingDao.findOrCreate({
      where: { id: booking.id },
      defaults: booking,
    });
    return _booking;
  },
  async makeBooking2(booking) {
    const myBooking = bookingDao.build(booking);
    console.log(myBooking instanceof bookingDao, myBooking);
    const _booking = await bookingDao.create(booking);
    return _booking;
  },
  async findBookingById(id) {
    // eager loading
    // const booking = await bookingDao.findByPk(id, { include: passengerDao });
    const booking = await bookingDao.findByPk(id);
    // const booking = await bookingDao.findOne({where: {id: id}});
    if (!booking) throw new NotFoundError(`cannot find #${id} booking`);
    // lazy loading
    const bookingWithPassenger = await booking.getPassengers();
    booking.setDataValue("passengers", bookingWithPassenger);
    return booking;
  },
  async updateBooking(id, booking) {
    /**
     * @type Model
     */
    const oldBooking = await this.findBookingById(id);
    if (!booking) throw new NotFoundError(`cannot find #${id} booking`);
    // const { bookerId, isActive } = booking;
    const newBooking = await oldBooking.update(booking);
    return newBooking;
  },
  async deleteBookingById(id) {
    /**
     * @type Model
     */
    const booking = await bookingDao.findByPk(id);
    if (!booking) throw new NotFoundError(`cannot find #${id} booking`);
    const res = await booking.destroy();
    return res;
  },
};

module.exports = bookingService;
