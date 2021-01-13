const { UserBooking } = require("@utopia-airlines-wss/common/models");

const bookingService = {
  async getBookingsForUser(user) {
    return await UserBooking.findAll({
      where: { userId: user.id },
      include: "passengers",
    });
  },
};

module.exports = bookingService;