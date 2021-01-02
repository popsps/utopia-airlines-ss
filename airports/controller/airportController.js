const { airportService } = require("../service");

const airportController = {
  async getAll(req, res, next) {
    try{
      res.json(await airportService.findAllAirports());
    } catch(err){
      next(err);
    }
  },

  async getById(req, res, next){
    try{
      res.json(await airportService.findAirportById(req.params.id));
    } catch(err){
      next(err);
    }
  },

};

module.exports = { airportController };