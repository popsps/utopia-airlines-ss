const { Router } = require("express");
const router = Router();

router.use("/airports", require("./airports"));

module.exports = router;