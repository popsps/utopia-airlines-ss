const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

router.get("/", userController.getSession);

router.post("/", userController.createSession);
router.delete("/", userController.deleteSession);

module.exports = router;