const { Router } = require("express");
var router = Router();

router.use("/api", require("./api"));

module.exports = router;