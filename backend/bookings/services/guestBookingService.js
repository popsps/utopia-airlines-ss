const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking, GuestBooking, BookingGuest } = require("@utopia-airlines-wss/common/models");
const { StandardizedError, NotFoundError, handleMutationError   } = require("@utopia-airlines-wss/common/errors");

const { flightService } = require("./flightService");

const guestBookingService = {
  async findAllGuestBookings({ isActive = true } = {}) {
    const where = { isActive };
    return await GuestBooking.findAll({
      where,
      include: [
        "agent",
        {
          association: "flights",
          include: {
            association: "route",
            include: ["origin", "destination"],
          },
          through: { attributes: [] },
        },
        "passengers",
      ],
    });
  },
  async findGuestBookingById({ id }) {
    const booking = await GuestBooking.findByPk(
      id,
      {
        include: [
          "agent",
          {
            association: "flights",
            include: {
              association: "route",
              include: ["origin", "destination"],
            },
            through: { attributes: [] },
          },
          "passengers",
        ],
      }
    );
    if (!booking) throw new NotFoundError("cannot find booking");
    return booking;
  },
  async createGuestBooking({ flights, passengers, contact, agentId }) {
    const transaction = await sequelize.transaction();
    try {
      await flightService.validateFlights({ flights, passengerCount: passengers.length });
      const data = {
        guest: {
          contactEmail: contact.email,
          contactPhone: contact.phone,
        },
        passengers: passengers.map(
          ({ name: { given: givenName, family: familyName } = {}, ...rest }) => ({ ...rest,  givenName, familyName })
        ),
      };
      if (agentId != null) data.agent = { agentId };
      const booking = await Booking.create(
        data,
        {
          transaction,
          include: [
            "passengers",
            "agent",
            "guest",
          ],
        }
      );
      await booking.setFlights(flights, { transaction });
      await transaction.commit();
      return booking;
    } catch (err) {
      await transaction.rollback();
      if (err instanceof StandardizedError) throw err;
      handleMutationError(err);
    }
  },
  async updateBooking(id, { contact: { email, phone } = {} }) {
    const booking = await GuestBooking.findByPk(id);
    if (!booking) throw new NotFoundError("cannot find booking");
    try {
      const data = {};
      if (email != null) data.contactEmail = email;
      if (phone != null) data.contactPhone = phone;
      await BookingGuest.update(data, { where: { bookingId: id } });
      return booking.reload();
    } catch (err) {
      handleMutationError(err);
    }

  },
};

module.exports = { guestBookingService };
