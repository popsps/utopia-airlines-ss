const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

const { checkSchema } = require("express-validator");
const getUserSchema = require("../../../schemas/user");
const { validateRequest } = require("@utopia-airlines-wss/common/middleware");

router.get("/", userController.getAll);
router.post("/",
  checkSchema(getUserSchema(), ["body"]),
  validateRequest,
  userController.create
);

router.get("/:id", userController.getById);
router.put("/:id",
  checkSchema(getUserSchema(true), ["body"]),
  validateRequest,
  userController.updateById
);
router.delete("/:id", userController.deleteById);

module.exports = router;