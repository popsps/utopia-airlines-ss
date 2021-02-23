const { Op } = require("sequelize");
const { Flight, FlightRaw } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");
const { removeUndefined } = require("@utopia-airlines-wss/common/util");

const getDateRange = date => {
  const startTime = new Date(date.getTime());
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startTime.getTime());
  endTime.setDate(endTime.getDate() + 1);
  return [startTime, endTime];
};

const flightService = {
  async findAllFlights({ origin, destination, departureDate } = {}, { offset = 0, limit = 10 }){
    const { count, rows } = await Flight.findAndCountAll({
      where: removeUndefined({ 
        departureTime: departureDate
          ? {
            [Op.between]: getDateRange(new Date(departureDate)),
          }
          : null,
      }),
      offset: +offset,
      limit: +limit,
      order: [
        ["departureTime", "ASC"],
      ],
      include: [ 
        { 
          association: "route",
          where: removeUndefined({
            originId: origin && {
              [Op.substring]: origin,
            },
            destinationId: destination && {
              [Op.substring]: destination,
            },
          }), 
        },
        "airplane",
      ],
    });
    return {
      total: count,
      offset,
      count: rows.length,
      results: rows,
    }; 
  },
  async findFlightById(id) {
    const flight = await Flight.findByPk(id,
      {
        include: [
          "route",
          "airplane",
        ],
      });
    if(!flight) throw new NotFoundError("cannot find flight");
    return flight; 
  },
  async createFlight({ routeId, airplaneId, departureTime, seats: { reserved, price } = {} } = {}) {
    try {
      return await FlightRaw.create({
        routeId,
        airplaneId,
        departureTime,
        reservedSeats: reserved,
        seatPrice: price,
      });
    } catch(err) {
      handleMutationError(err);
    }
  },
  async updateFlight(id, { routeId, airplaneId, departureTime, seats: { reserved, price } = {} } = {}) {
    const flight = await flightService.findFlightById(id);
    if(!flight) throw new NotFoundError("cannot find flight");
    try {
      const newFlightInfo = {
        routeId,
        airplaneId,
        departureTime,
        reservedSeats: reserved,
        seatPrice: price,
      };
      flight.update(newFlightInfo);
    } catch(err) {
      handleMutationError(err);
    }
  },
  async deleteFlight(id) {
    const flight = await Flight.findByPk(id);
    if(!flight) throw new NotFoundError("cannot find flight");
    await flight.destroy();
  },
};

module.exports = flightService;