const { Router } = require("express");
const router = Router();

const { bookingController } = require("../../../controllers/bookingController");


router.get("/", bookingController.getAll);
router.post("/", bookingController.create);

router.get("/:id", bookingController.getById);
router.put("/:id", bookingController.updateById);
router.delete("/:id", bookingController.deleteById);

module.exports = router;