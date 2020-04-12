const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateJoi, validateUuid } = require('../../validation/validate');
const schemas = require('./user.schemas');
const { ErrorHandler } = require('../../errors/error');

router
  .route('/')
  .get((req, res, next) => {
    try {
      const users = usersService.getUsers();
      if (users.length > 0) {
        res.json(users.map(User.toResponse));
      } else {
        throw new ErrorHandler(404, 'No users found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .post(validateJoi(schemas.post), (req, res, next) => {
    try {
      const newUser = usersService.createUser(req.body);
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
      const user = usersService.getOneUser(req.params.id);
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
  .put(validateJoi(schemas.put), (req, res, next) => {
    try {
      const updatedUser = { ...req.body, id: req.params.id };
      const updated = usersService.updateUser(updatedUser);
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
  .delete((req, res, next) => {
    try {
      const userDeleted = usersService.deleteUser(req.params.id);
      if (userDeleted) {
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
