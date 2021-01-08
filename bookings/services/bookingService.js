const { Op } = require("sequelize");
const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking, Flight } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, BadRequestError, handleMutationError  } = require("@utopia-airlines-wss/common/errors");

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
  async findAllBookings({ isActive } = {}) {
    return await Booking.findAll({
      where: {
        isActive: isActive ?? true,
      },
    });
  },
  async findBookingById(id) {
    const booking = await Booking.findByPk(id, {
      include: "passengers",
    });
    if (!booking) throw new NotFoundError("cannot find booking");
    return booking;
  },
  async createBooking({ flights, passengers }) {
    const transaction = await sequelize.transaction();
    try {
      flights = await Flight.findAll({
        where: {
          id: {
            [Op.or]: flights,
          },
        },
      });
      if (!flights.every(flight => flight.availableSeats >= passengers.length)) {
        throw new BadRequestError("not enough seats");
      }
      const booking = await Booking.create({ passengers }, {
        transaction,
        include: [
          "passengers",
        ],
      });
      await booking
        .update({ flights }, { transaction });

      await transaction.commit();
      return booking;
    } catch (err) {
      await transaction.rollback();
      handleMutationError(err);
    }
  },
  async updateBooking(id, { isActive, flights, passengers }) {
    const booking = await bookingService.findBookingById(id);
    const transaction = await sequelize.transaction();
    try {
      await booking.update({ 
        flights,
        isActive,
      }, {
        transaction,
      });
      await transaction.commit();
      return booking;
    } catch (err) {
      await transaction.rollback();
      handleMutationError(err);
    }

  },
  async deleteBookingById(id) {
    const booking = await bookingService.findBookingById(id);
    await booking.destroy();
  },
};

module.exports = { bookingService };
