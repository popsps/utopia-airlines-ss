const { Router } = require("express");
const router = Router();

const { airportController } = require("../../../controller");

router.get("/", airportController.getAll);

router.get("/:id", airportController.getById);

module.exports = router;