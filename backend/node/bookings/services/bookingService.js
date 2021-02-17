const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");

const findBookingById = async (id, options) => {
  const booking = await Booking.findByPk(id, options);
  if (!booking) throw new NotFoundError("cannot find booking");
  return booking;
};

const bookingService = {
  async findAllBookings(
    {isActive = true, offset = 0, limit = 10} = {}) {
    const where = {isActive};
    if(limit > 10000)
      throw new BadRequestError("Limit exceeds maximum of 10000");
    const bookings = await Booking.findAndCountAll({
      where,
      limit: +limit,
      offset: +offset,
      distinct: true,
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
    return bookings;
  },
  async findBookingById({ id }) {
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
    return booking;
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
