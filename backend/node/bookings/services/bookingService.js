const { Op } = require("sequelize");
const { sequelize } = require("@utopia-airlines-wss/common/db");
const { Booking } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError, BadRequestError } = require("@utopia-airlines-wss/common/errors");
const { removeUndefined } = require("@utopia-airlines-wss/common/util");

const findBookingById = async (id, options) => {
  const booking = await Booking.findByPk(id, options);
  if (!booking) throw new NotFoundError("cannot find booking");
  return booking;
};

// const removeUndefined = query => {
//   return [
//     ...Object.entries(query),
//     ...Object.getOwnPropertySymbols(query)
//       .map(key => [key, query[key]]),
//   ]
//     .filter(([, value]) => value != null)
//     .reduce((obj, [key, value]) => {
//       obj[key] = value;
//       return obj;
//     }, {});
// };
const getDateRange = date => {
  const startTime = new Date(date.getTime());
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startTime.getTime());
  endTime.setDate(endTime.getDate() + 1);
  return [startTime, endTime];
};

const bookingService = {
  async findAllBookings({
    isActive = true, offset = 0, limit = 10,
    gender, fName, lName, origin, destination, departureDate, aid, id
  }) {
    if (limit > 10000)
      throw new BadRequestError("Limit exceeds maximum of 10000");
    isActive = !(isActive && isActive === "false");
    const bookings = await Booking.findAndCountAll({
      limit: +limit,
      offset: +offset,
      distinct: true,
      where: { isActive },
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
          // required: false,
          where: {
            ...removeUndefined({
              departureTime: departureDate ? { [Op.between]: getDateRange(new Date(departureDate)), } : null,
              id: aid && { [Op.eq]: aid },
              // "$route.origin.city$": { [Op.substring]: origin }
            }),
            [Op.and]: (origin || destination) ? [
              [
                origin ?
                  {
                    [Op.or]: [
                      { "$route.origin_id$": { [Op.substring]: origin }, },
                      { "$route.origin.name$": { [Op.substring]: origin }, },
                      { "$route.origin.city$": { [Op.substring]: origin }, },
                      { "$route.origin.country$": { [Op.substring]: origin }, },
                    ]
                  } : null,
                destination ?
                  {
                    [Op.or]: [
                      { "$route.destination_id$": { [Op.substring]: destination }, },
                      { "$route.destination.name$": { [Op.substring]: destination }, },
                      { "$route.destination.city$": { [Op.substring]: destination }, },
                      { "$route.destination.country$": { [Op.substring]: destination }, }
                    ]
                  } : null
              ]
            ] : [],
          },
          include: {
            association: "route",
            // required: false,
            // where: removeUndefined({
            //   originId: origin && {
            //     [Op.substring]: origin,
            //   },
            //   destinationId: destination && {
            //     [Op.substring]: destination,
            //   },
            // }),
            // where: removeUndefined({
            //   id: id && { [Op.eq]: id }
            // }),
            include: [
              {
                association: "origin",
                required: false,
                // where: removeUndefined({
                //   city: origin && {
                //     [Op.substring]: origin,
                //   }
                // })
              },
              {
                association: "destination",
                // where: removeUndefined({
                //   iataId: destination && {
                //     [Op.substring]: destination,
                //   }
                // })
              }],

          },
          through: { attributes: [] },
        },
        {
          association: "passengers",
          where: removeUndefined({
            gender: gender && {
              [Op.substring]: gender,
            },
            givenName: fName && {
              [Op.substring]: fName
            },
            familyName: lName && {
              [Op.substring]: lName
            },
          })
        },
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
