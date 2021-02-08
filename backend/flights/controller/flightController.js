const { flightService } = require("../service");


const replacer = (type) => (_key, value) => value.toJSON?.length === 1
  ? value.toJSON(type)
  : value;

const flightController = {
  async getAll(req, res, next) {
    try{
      const { offset, limit, ...query } = req.query;
      const flights = await flightService.findAllFlights(query, { offset, limit });
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(
        flights,
        replacer(["ADMIN", "AGENT"].includes(req?.user.role.name) ? "full" : "slim")
      ));
    } catch(err){
      next(err);
    }
  },
  async getById(req, res, next){
    try{
      const flight = await flightService.findFlightById(req.params.id);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(
        flight,
        replacer(["ADMIN", "AGENT"].includes(req?.user.role.name) ? "full" : "slim")
      ));
    } catch(err){
      next(err);
    }
  },
  async create(req, res, next) {
    try{
      const flight = await flightService.createFlight(req.body);
      res.status(201).json(flight);
    } catch(err){
      next(err);
    }
  },
  async updateById(req, res, next) {
    try {
      res.json(await flightService.updateFlight(req.params.id, req.body));
    } catch(err) {
      next(err);
    }
  },
  async deleteById(req, res, next) {
    try {
      await flightService.deleteFlight(req.params.id);
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  },
};

module.exports = { flightController };