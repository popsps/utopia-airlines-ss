const { Op } = require("sequelize");
const { Flight, FlightRaw } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");
const { removeUndefined } = require("@utopia-airlines-wss/common/util");

const getDateRange = date => {
  const startTime = new Date(date.getTime());
  startTime.setHours(0, 0, 0, 0);
  startTime.setDate(startTime.getDate() + 1);
  const endTime = new Date(startTime.getTime());
  endTime.setDate(endTime.getDate() + 1);
  return [startTime, endTime];
};

const flightService = {
  async findAllFlights({ offset, limit, origin, destination, departureDate } = {}){
    return Flight.findAll({
      where: removeUndefined({ 
        departureTime: (() => {
          if (!departureDate) return null;
          return {
            [Op.between]: getDateRange(new Date(departureDate)),
          };
        })(),
      }),
      offset: offset ?? 0,
      limit: limit ?? 10,
      include: [ 
        { 
          association: "route",
          where: removeUndefined({
            originId: origin?.toUpperCase(),
            destinationId: destination?.toUpperCase(),
          }), 
        },
        "airplane",
      ],
    });
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