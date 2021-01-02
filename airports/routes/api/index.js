const { Router } = require("express");
var router = Router();

router.use("/airports", require("./airports"));

module.exports = router;