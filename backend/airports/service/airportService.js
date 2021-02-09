const { Op } = require("sequelize");
const { Airport } = require("@utopia-airlines-wss/common/models");
const { NotFoundError } = require("@utopia-airlines-wss/common/errors");
const { removeUndefined } = require("@utopia-airlines-wss/common/util");

const airportService = {
  async findAirportById(iataId) {
    const airport = await Airport.findByPk(iataId, {
      include: ["departureRoutes", "arrivalRoutes" ],
    });
    if(!airport) throw NotFoundError("cannot find airport");
    return airport;
  },
  async findAllAirports({ query } = {}) {
    return Airport.findAll({
      where: removeUndefined({
        [Op.or]: query && [
          {
            iataId: {
              [Op.substring]: query,
            },
          },
          {
            name: {
              [Op.substring]: query,
            },
          },
        ],
      }),
      include: ["departureRoutes", "arrivalRoutes" ],
    });
  },
};

module.exports = airportService;