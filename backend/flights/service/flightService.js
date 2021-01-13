const { Flight } = require("@utopia-airlines-wss/common/models");
// const { Booking } = require("@utopia-airlines-wss/common/models");
// const { Passenger } = require("@utopia-airlines-wss/common/models");
const { NotFoundError, handleMutationError } = require("@utopia-airlines-wss/common/errors");
const { sequelize } = require("../../common/db");

const flightService = {
  async findAllFlights({ origin, destination, departure } = {}){
    const flightQuery = {};
    if(departure != null) flightQuery.departureTime = departure;
    const routeQuery = {};
    if(origin != null) routeQuery.originId = origin;
    if(destination != null) routeQuery.destinationId = destination;
    return Flight.findAll({
      where: flightQuery,
      include: [ { 
        association: "route",
        where: routeQuery, 
      }],
    });
  },
  async findFlightById(id) {
    const flight = await Flight.findByPk(id, { include: "route" });
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
  async createFlight({ id, routeId, departureTime, flightDuration, capacity, seatPrice } = {}) {
    const transaction = await sequelize.transaction();
    try {
      const flight = await Flight.create({ id, routeId, departureTime, flightDuration, capacity, seatPrice });
      await transaction.commit();
      return flight;
    } catch(err) {
      await transaction.rollback();
      handleMutationError(err);
    }
  },
  async updateFlight(id, { routeId, departureTime, flightDuration, capacity, seatPrice } = {}) {
    const flight = await flightService.findFlightById(id);
    if(!flight) throw new NotFoundError("cannot find flight");
    const transaction = await sequelize.transaction();
    try {
      const newFlightInfo = {
        id: id,
        routeId: routeId,
        departureTime: departureTime,
        flightDuration: flightDuration,
        capacity: capacity,
        seatPrice: seatPrice,
      };
      flight.update(newFlightInfo);
    } catch(err) {
      await transaction.rollback();
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