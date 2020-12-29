const { Router } = require("express");
const router = Router();

const { userService } = require("../../../services");

router.get("/", async (req, res, next) => {
  try {
    res.json(await userService.findAllUsers());
  } catch(err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch(err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await userService.findUserById(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    res.json(await userService.updateUser(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;