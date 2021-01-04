const { flightService } = require("../service");

const flightController = {
  async getAll(req, res, next) {
    try{
      res.json(await flightService.findAllFlights(req.query));
    } catch(err){
      next(err);
    }
  },
  async getById(req, res, next){
    try{
      res.json(await flightService.findFlightById(req.params.id));
    } catch(err){
      next(err);
    }
  },
  async getFlightBookings(req, res, next) {
    try{
      res.json(await flightService.findFlightBookings(req.params.id));
    } catch(err){
      next(err);
    }
  },
  // async getFlightPassengers(req, res, next) {
  //   try{
  //     res.json(await flightService.findFlightPassengers(req.params.id));
  //   } catch(err){
  //     next(err);
  //   }
  // },
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