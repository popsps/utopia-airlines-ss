const { Flight, FlightRaw } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");

const flightService = {
  async findAllFlights({ origin, destination, departure } = {}){
    const flightQuery = {};
    if(departure != null) flightQuery.departureTime = departure;
    const routeQuery = {};
    if(origin != null) routeQuery.originId = origin;
    if(destination != null) routeQuery.destinationId = destination;
    return Flight.findAll({
      where: flightQuery,
      include: [ 
        { 
          association: "route",
          where: routeQuery, 
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
  async findFlightBookings(id) {
    const query = {};
    const { bookings } = await Flight.findByPk(id, {
      where: query,
      attributes: [],
      include: [{
        association: "bookings", 
        include: "passengers", 
        through: { attributes: [] },
      }],
    });
    return bookings;
  },
  // async findFlightPassengers(id) {
  //   const query = {};
  //   return Flight.findAll({
  //     where: query,
  //     include: [],
  //   });
  // },
  async createFlight({ routeId, airplaneId, departureTime, reservedSeats, seatPrice } = {}) {
    try {
      return await FlightRaw.create({ routeId, airplaneId, departureTime, reservedSeats, seatPrice });
    } catch(err) {
      handleMutationError(err);
    }
  },
  async updateFlight(id, { routeId, airplaneId, departureTime, reservedSeats, seatPrice } = {}) {
    const flight = await flightService.findFlightById(id);
    if(!flight) throw new NotFoundError("cannot find flight");
    try {
      const newFlightInfo = {
        routeId,
        airplaneId,
        departureTime,
        reservedSeats,
        seatPrice,
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