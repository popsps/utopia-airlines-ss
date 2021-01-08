const { Router } = require("express");
const router = Router();

const { bookingController } = require("../../../controllers/bookingController");

const { body, oneOf } = require("express-validator");
const { validateRequest, requireAuthentication } = require("@utopia-airlines-wss/common/middleware");


router.get("/", bookingController.getAll);
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
    oneOf([
      body("contact")
        .isInt().withMessage("please provide a contact"),
      [
        body("contact.contactEmail")
          .isEmail().withMessage("please provide a contact email"),
        body("contact.contactPhone")
          .isEmail().withMessage("please provide a contact phone"),
      ],
    ]),
  ],
  validateRequest,
  requireAuthentication({
    roles: ["AGENT"],
    condition: (req) => typeof req.body?.contact === "number", 
  }),
  requireAuthentication({
    roles: ["CUSTOMER"],
    condition: (req) => req.body?.contact == null, 
  }),
  bookingController.create
);

router.route("/:id")
  .get(bookingController.getById)
  .put(
    [
      body("flights")
        .isArray().withMessage("please provide flights"),
      body("passengers")
        .isArray().withMessage("please provide passengers"),
    ],
    validateRequest,
    bookingController.updateById
  )
  .delete(bookingController.deleteById);

module.exports = router;