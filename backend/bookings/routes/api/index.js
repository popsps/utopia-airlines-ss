const { Router } = require("express");
const router = Router();

router.use("/bookings", require("./bookings"));

module.exports = router;