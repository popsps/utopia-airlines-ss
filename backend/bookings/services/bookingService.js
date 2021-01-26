const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking } = require("@utopia-airlines-wss/common/models");
const {  NotFoundError,  handleMutationError   } = require("@utopia-airlines-wss/common/errors");

const findBookingById = async (id, options) => {
  const booking = await Booking.findByPk(id, options);
  if (!booking) throw new NotFoundError("cannot find booking");
  return booking;
};

const replacer = (key, value) =>  key === "passengers"
  ? value.map((passenger) => passenger.toJSON("full"))
  : value;


const bookingService = {
  async findAllBookings({ isActive = true } = {}) {
    const where = { isActive };
    const bookings = await Booking.findAll({
      where,
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

    return JSON.parse(JSON.stringify(bookings, replacer));
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
    return JSON.parse(JSON.stringify(booking, replacer));
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
