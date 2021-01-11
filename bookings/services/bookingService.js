const { Op, Model } = require("sequelize");
const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking, Flight } = require("@utopia-airlines-wss/common/models");
const { StandardizedError, NotFoundError, BadRequestError, handleMutationError   } = require("@utopia-airlines-wss/common/errors");

const parseBookingData = ({ passengers, contact, agent }) => {
  const data = {
    passengers: passengers.map(
      ({ name: { given: givenName, family: familyName } = {}, ...rest }) => ({ ...rest,  givenName, familyName })
    ),
  };
  if (agent != null) data.agent = { agentId: agent.id };
  if (typeof contact === "number") data.user = { userId: contact };
  else if (contact instanceof Model) data.user = { userId: contact.id };
  else data.guest = {
    contactEmail: contact.email,
    contactPhone: contact.phone,
  };
  return data;
};

const bookingService = {
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
  async createBooking({ flights, passengers, contact, agent }) {
    const transaction = await sequelize.transaction();
    try {
      const booking = await Booking.create(
        parseBookingData({ passengers, contact, agent }),
        {
          transaction,
          include: [
            "passengers",
            "agent",
            typeof contact === "number" || contact instanceof Model ? "user" : "guest",
          ],
        });
      const fullFlightCount = await Flight.count({
        where: {
          id: { [Op.or]: flights },
          availableSeats: { [Op.lt]: passengers.length },
        },
      });
      if (fullFlightCount)
        throw new BadRequestError("not enough seats");
      await booking.setFlights(flights, { transaction });
      await transaction.commit();
      return booking;
    } catch (err) {
      await transaction.rollback();
      if (err instanceof StandardizedError) throw err;
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
