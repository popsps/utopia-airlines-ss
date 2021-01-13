const { Airport } = require("@utopia-airlines-wss/common/models");
const { NotFoundError } = require("@utopia-airlines-wss/common/errors");

const airportService = {
  async findAirportById(iataId) {
    const airport = await Airport.findByPk(iataId, {});
    if(!airport) throw NotFoundError("cannot find airport");
    return airport;
  },
  async findAllAirports() {
    const query = {};
    return Airport.findAll({
      where: query,
      include: ["arrivalRoutes", "departureRoutes"],
    });
  },
};

module.exports = airportService;