const { Flight, FlightRaw } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");
const { removeUndefined } = require("@utopia-airlines-wss/common/util");


const flightService = {
  async findAllFlights({ offset, limit, origin, destination, departureTime } = {}){
    return Flight.findAll({
      where: removeUndefined({ departureTime }),
      offset: offset ?? 0,
      limit: limit ?? 10,
      include: [ 
        { 
          association: "route",
          where: removeUndefined({ origin, destination }), 
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