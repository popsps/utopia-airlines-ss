const { Passenger } = require("@utopia-airlines-wss/common/models");
const {  NotFoundError   } = require("@utopia-airlines-wss/common/errors");


const passengerService = {
  async findAllPassengers() {
    return  await Passenger.findAll({});
  },
  async findPassengerById({ id }) {
    const passenger = await Passenger.findByPk(id);
    if (!passenger) throw new NotFoundError("cannot find passenger");
    return passenger;
  },
  async updatePassenger(id, { name, dob, gender, address } = {}) {
    const data = {};
    if (name?.given != null) data.givenName = name.given;
    if (name?.family != null) data.familyName = name.family;
    if (dob != null) data.dob = name.dob;
    if (gender != null) data.gender = name.gender;
    if (address != null) data.address = name.address;
    const passenger = await Passenger.update(data, { where: { id } });
    if (!passenger) throw new NotFoundError("cannot find passenger");
    return passenger;
  },
};

module.exports = { passengerService };
