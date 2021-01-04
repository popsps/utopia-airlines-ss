// eslint-disable-next-line no-unused-vars
const { bookingDao, passengerDao } = require("../dao");
const NotFoundError = require("../error/NotFoundError");

const bookingService = {
  validateBooking(booking) {
    if (!("bookerId" in booking) || !Number.isInteger(booking["bookerId"]))
      return false;
    if (!("isActive" in booking) || !(typeof booking["isActive"] === "boolean"))
      return false;
    if (("id" in booking) && !Number.isInteger(booking["id"]))
      return false;
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
    // const _booking = await bookingDao.save(booking);
    // return _booking;
    let _booking = null;
    if ("id" in booking) {
      _booking = await bookingDao.findOrCreate({
        where: { id: booking.id },
        defaults: booking,
      });
    }
    else {
      _booking = await bookingDao.create(booking);
      _booking = [_booking, true];
      if ("passengers" in booking)
        await this.addPassengers(_booking[0]["id"], booking["passengers"]);
    }
    return _booking;
  },
  async addPassengers(id, passengers) {
    for (let passenger of passengers) {
      passenger["bookingId"] = id;
      await passengerDao.upsert(passenger);
    }
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
    if (!booking) throw new NotFoundError(`cannot find booking #${id}`);
    // const { bookerId, isActive } = booking;
    const { bookerId, isActive } = booking;
    let newBooking = await oldBooking.update({ bookerId, isActive });
    if ("passengers" in booking) {
      await this.addPassengers(id, booking["passengers"]);
      newBooking = await this.findBookingById(id);
    }
    return newBooking;
  },
  async deleteBookingById(id) {
    /**
     * @type Model
     */
    const booking = await bookingDao.findByPk(id);
    if (!booking) throw new NotFoundError(`cannot find booking #${id}`);
    const res = await booking.destroy();
    return res;
  },
};

module.exports = bookingService;
