const { Router } = require("express");
const router = Router();

const { flightController } = require("../../../controller");

router.get("/", flightController.getAll);

router.post("/", flightController.create);

router.get("/:id", flightController.getById);

router.put("/:id", flightController.updateById);

router.delete("/:id", flightController.deleteById);

router.get("/:id/bookings", flightController.getFlightBookings);

// router.get("/:id/passengers", flightController.getFlightPassengers);

module.exports = router;