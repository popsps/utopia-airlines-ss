const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");

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
    if (!booking) throw new NotFoundError(`cannot find #${id} booking`);
    return booking;
  },
  async createBooking({ flights, passengers }) {
    const transaction = await sequelize.transaction();
    try {
      const booking = await Booking.create({ passengers }, {
        transaction,
        include: [
          "passengers",
        ],
      });

      await booking
        .update("flights", flights);

      await transaction.commit();
      return booking;
    } catch (err) {
      await transaction.rollback();
      handleMutationError(err);
    }
  },
  async updateBooking(id, booking) {
    const oldBooking = await this.findBookingById(id);
    if (!booking) throw new NotFoundError(`cannot find booking #${id}`);
    const transaction = await sequelize.transaction();
    try {
      // const { bookerId, isActive } = booking;
      const { bookerId, isActive } = booking;
      let newBooking = await oldBooking.update({ bookerId, isActive },
        { transaction: transaction });
      if ("passengers" in booking) {
        await this.addPassengers(id, booking["passengers"], transaction);
      }
      await transaction.commit();
      if ("passengers" in booking) {
        newBooking = await this.findBookingById(id);
      }
      return newBooking;
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

module.exports = bookingService;
