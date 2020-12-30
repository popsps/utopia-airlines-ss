const { Router } = require("express");
const router = Router();

const { userController } = require("../../../controllers");

const { oneOf, checkSchema } = require("express-validator");
const { getUserSchema, getUserInfoSchema } = require("../../../schemas/user");
const { validateRequest } = require("@utopia-airlines-wss/common/middleware");

router.get("/", userController.getAll);
router.post("/",
  oneOf([
    checkSchema(
      {
        ...getUserSchema(),
        info: {
          exists: {
            errorMessage: "invalid info structure",
            negated: true,
          },
        },
      },
      ["body"]
    ),
    checkSchema(
      {
        ...getUserSchema(),
        ...getUserInfoSchema(),
      },
      ["body"]
    ),
  ]),
  validateRequest,
  userController.create
);

router.get("/:id", userController.getById);
router.put("/:id",
  checkSchema(
    {
      ...getUserSchema({ optional:true }),
      ...getUserInfoSchema({ optional:true }),
    },
    ["body"]
  ),
  validateRequest,
  userController.updateById
);
router.delete("/:id", userController.deleteById);

module.exports = router;