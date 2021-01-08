const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

const { checkSchema } = require("express-validator");
const { UserSchema } = require("@utopia-airlines-wss/common/schemas");
const { validateRequest, requireAuthentication  } = require("@utopia-airlines-wss/common/middleware");

router.use("/session", require("./session"));

router.get("/",
  requireAuthentication({
    roles: ["ADMIN"],
  }),
  userController.getAll);
router.post("/",
  checkSchema(new UserSchema(), ["body"]),
  validateRequest,
  requireAuthentication({
    condition: (req) => req.body?.roleId != null,
    roles: ["ADMIN"],
  }),
  userController.create
);

router.route("/:id")
  .all(requireAuthentication({
    condition: (req) => req.user?.id !== +req.params.id,
    roles: ["ADMIN"],
  }))
  .get(userController.getById)
  .put(
    checkSchema(new UserSchema({ optional:true }), ["body"]),
    validateRequest,
    userController.updateById
  )
  .delete(userController.deleteById);

router.get("/:id/bookings",
  requireAuthentication({
    condition: (req) => req.user?.id !== +req.params.id,
    roles: ["ADMIN"],
  }),
  userController.getUserBookings
);

module.exports = router;