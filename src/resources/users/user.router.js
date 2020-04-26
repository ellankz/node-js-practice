const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateJoi, validateUuid } = require('../../validation/validate');
const schemas = require('./user.schemas');
const { ErrorHandler } = require('../../errors/error');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getUsers();
      res.json(users.map(User.toResponse));
    } catch (error) {
      next(error);
      return;
    }
  })
  .post(validateJoi(schemas.post), async (req, res, next) => {
    try {
      const newUser = await usersService.createUser(req.body);
      res.json(User.toResponse(newUser));
    } catch (error) {
      next(error);
      return;
    }
  });

router
  .route('/:id')
  .all(validateUuid())
  .get(async (req, res, next) => {
    try {
      const user = await usersService.getOneUserById(req.params.id);
      if (user) {
        res.json(User.toResponse(user));
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .put(validateJoi(schemas.put), async (req, res, next) => {
    try {
      const updatedUser = { ...req.body, id: req.params.id };
      const updated = await usersService.updateUser(updatedUser);
      if (updated) {
        res.json(User.toResponse(updatedUser));
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .delete(async (req, res, next) => {
    try {
      const userDeleted = await usersService.deleteUser(req.params.id);
      if (userDeleted === 1) {
        res.status(204).send('The user has been deleted');
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  });

module.exports = router;
