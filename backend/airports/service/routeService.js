const { Route } = require("@utopia-airlines-wss/common/models");

const routeService = {
  async findAllAirportRoutes({ destinationId , arrivalId } = {}) {
    const query = { destinationId, arrivalId };
    return Route.findAll({
      where: query,
      include: ["destination", "origin"],
    });
  },
};


module.exports = routeService;