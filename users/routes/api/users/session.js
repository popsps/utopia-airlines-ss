const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

router.get("/session", userController.getSession);

router.post("/session", userController.createSession);
router.delete("/session", userController.deleteSession);

module.exports = router;