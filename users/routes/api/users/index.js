const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

const { oneOf, checkSchema } = require("express-validator");
const { getUserSchema } = require("../../../schemas/user");
const { validateRequest, requireAuthentication  } = require("@utopia-airlines-wss/common/middleware");

router.get("/",
  requireAuthentication({
    roles: ["ADMIN"],
  }),
  userController.getAll);
router.post("/",
  oneOf([
    checkSchema(getUserSchema({ excludeInfo: true }), ["body"] ),
    checkSchema(getUserSchema(), ["body"]),
  ]),
  validateRequest,
  requireAuthentication({
    condition: (req) => req.body?.roleId != null,
    roles: ["ADMIN"],
  }),
  userController.create
);

router.get("/session", userController.getSession);

router.post("/session", userController.createSession);
router.delete("/session", userController.deleteSession);

router.route("/:id")
  .all(requireAuthentication({
    condition: (req) => req.user?.id !== +req.params.id,
    roles: ["ADMIN"],
  }))
  .get(userController.getById)
  .put(
    checkSchema(getUserSchema({ optional:true }), ["body"]),
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