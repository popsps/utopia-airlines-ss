const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking, UserBooking } = require("@utopia-airlines-wss/common/models");
const { StandardizedError, NotFoundError, handleMutationError, AuthorizationError   } = require("@utopia-airlines-wss/common/errors");

const { flightService } = require("./flightService");

const userBookingService = {
  async findAllUserBookings({ isActive = true, userId } = {}) {
    const where = { isActive };
    if (userId != null) where.userId = userId;
    return await UserBooking.findAll({
      where,
      include: [
        "agent",
        "user",
        "flights",
        "passengers",
      ],
    });
  },
  async findUserBookingById({ id, userId }) {
    const booking = await UserBooking.findByPk(
      id,
      {
        include: [
          "agent",
          "user",
          "flights",
          "passengers",
        ],
      }
    );
    if (!booking) throw new NotFoundError("cannot find booking");
    if (userId != null && booking.userId !== userId)
      throw new AuthorizationError();
    return booking;
  },
  async createUserBooking({ flights, passengers, userId, agentId }) {
    const transaction = await sequelize.transaction();
    try {
      await flightService.validateFlights({ flights, passengerCount: passengers.length });
      const data = {
        user: {
          userId,
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
            "user",
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
};

module.exports = { userBookingService };
