const { Op, Model } = require("sequelize");
const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking, UserBooking, Flight } = require("@utopia-airlines-wss/common/models");
const { StandardizedError, NotFoundError, BadRequestError, handleMutationError, AuthorizationError   } = require("@utopia-airlines-wss/common/errors");

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

const findBookingById = async (id, options) => {
  const booking = await Booking.findByPk(id, options);
  if (!booking) throw new NotFoundError("cannot find booking");
  return booking;
};

const bookingService = {
  async findAllBookings({ isActive = true, userId } = {}) {
    const useUserBooking = userId != null;
    return await (useUserBooking ? UserBooking : Booking).findAll({
      where: (() => {
        const where = {
          isActive: isActive,
        };
        if (useUserBooking) where.userId = userId;
        return where;
      })(),
      include: useUserBooking
        ? [ "agent", "user" ]
        : [
          {
            association: "agent",
            include: "agent",
          },
          {
            association: "user",
            include: "user",
          },
          "guest",
        ],
    });
  },
  async findBookingById({ id, userId }) {
    const booking = await findBookingById(
      id,
      {
        include: [
          {
            association: "agent",
            include: "agent",
          },
          {
            association: "user",
            include: "user",
          },
          "guest",
          "flights",
          "passengers",
        ],
      }
    );
    if (booking.type === "USER") {
      if (userId != null && booking.user?.userId !== userId)
        throw new AuthorizationError();
      if (userId !== null)
        throw new AuthorizationError();
    }
    return booking;
  },
  async createBooking({ flights, passengers, contact, agent }) {
    const transaction = await sequelize.transaction();
    try {
      const fullFlightCount = await Flight.count({
        where: {
          id: { [Op.or]: flights },
          availableSeats: { [Op.lt]: passengers.length },
        },
      });
      if (fullFlightCount)
        throw new BadRequestError("not enough seats");
      const booking = await Booking.create(
        parseBookingData({ passengers, contact, agent }),
        {
          transaction,
          include: [
            "passengers",
            "agent",
            typeof contact === "number" || contact instanceof Model
              ? "user"
              : "guest",
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
  async updateBooking(id, { isActive }) {
    const booking = await findBookingById(id);
    const transaction = await sequelize.transaction();
    try {
      await booking.update({ 
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
    const booking = await findBookingById(id);
    await booking.destroy();
  },
};

module.exports = { bookingService };
