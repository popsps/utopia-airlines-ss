const { StateConflictError } = require("@utopia-airlines-wss/common/errors");
const { userService, sessionService, bookingService } = require("../services");

const userController = {
  async getAll(req, res, next) {
    try {
      res.json(await userService.findAllUsers());
    } catch(err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch(err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const user = await userService.findUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  async updateById(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  async deleteById(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
  async getSession(req, res) {
    res.status(200).json(req.user || null);
  },
  async createSession(req, res, next) {
    if (req.user)
      next(new StateConflictError("session already exists"));
    try {
      req.session.jwt = await sessionService.createSession(req.body);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },
  async deleteSession(req, res) {
    req.session = null;
    res.sendStatus(205);
  },
  async getUserBookings(req, res, next) {
    try {
      const user = await userService.findUserById(req.params.id);
      res.json(await bookingService.getBookingsForUser(user));
    } catch(err) {
      next(err);
    }
  },
};

module.exports = { userController };