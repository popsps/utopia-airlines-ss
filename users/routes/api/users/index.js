const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

const { oneOf, checkSchema } = require("express-validator");
const { getUserSchema } = require("../../../schemas/user");
const { validateRequest, requireAuthentication  } = require("@utopia-airlines-wss/common/middleware");

router.get("/", userController.getAll);
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

router.get("/:id", userController.getById);
router.put("/:id",
  checkSchema(getUserSchema({ optional:true }), ["body"]),
  validateRequest,
  userController.updateById
);
router.delete("/:id", userController.deleteById);

module.exports = router;