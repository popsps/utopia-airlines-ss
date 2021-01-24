const { Router } = require("express");
const router = Router();

const { bookingController } = require("../../../../controllers/bookingController");

const { body } = require("express-validator");
const { validateRequest, requireAuthentication } = require("@utopia-airlines-wss/common/middleware");


router.get("/",
  requireAuthentication({
    roles: ["ADMIN", "AGENT"],
  }),
  bookingController.getAll
);
router.post("/",
  [
    body("flights")
      .exists().withMessage("please provide flights")
      .bail()
      .isArray().withMessage("flights must be an array")
      .isLength({ min:1 }).withMessage("please provide a flight"),
    body("passengers")
      .exists().withMessage("please provide passengers")
      .bail()
      .isArray().withMessage("passengers must be an array")
      .isLength({ min:1 }).withMessage("please provide a passenger"),
    body("contact.email")
      .exists().withMessage("please provide an email")
      .bail()
      .isEmail().withMessage("please provide a valid email"),
    body("contact.phone")
      .exists().withMessage("please provide a phone")
      .bail()
      .isMobilePhone().withMessage("please provide a valid phone number"),
  ],
  validateRequest,
  bookingController.create
);

router.route("/:id")
  .get(bookingController.getById)
  .put(
    [
      body("contact.email")
        .isEmail().withMessage("please provide a valid email"),
      body("contact.phone")
        .isMobilePhone().withMessage("please provide a valid phone number"),
    ],
    validateRequest,
    bookingController.updateById
  )
  .delete(
    requireAuthentication(),
    bookingController.deleteById
  );

module.exports = router;