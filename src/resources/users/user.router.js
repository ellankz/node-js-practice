const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateJoi, validateUuid } = require('../../validation/validate');
const schemas = require('./user.schemas');

router
  .route('/')
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    const users = usersService.getUsers();
    if (users.length > 0) {
      res.json(users.map(User.toResponse));
    } else {
      res.status(404).send('No users found');
    }
  })
  .post(validateJoi(schemas.post), (req, res) => {
    const newUser = usersService.createUser(req.body);
    res.json(User.toResponse(newUser));
  });

router
  .route('/:id')
  .all(validateUuid())
  .get(async (req, res) => {
    const user = usersService.getOneUser(req.params.id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
    }
  })
  .put(validateJoi(schemas.put), (req, res) => {
    const updatedUser = { ...req.body, id: req.params.id };
    const updated = usersService.updateUser(updatedUser);
    if (updated) {
      res.json(User.toResponse(updatedUser));
    } else {
      res.status(404).send('User not found');
    }
  })
  .delete((req, res) => {
    const userDeleted = usersService.deleteUser(req.params.id);
    if (userDeleted) {
      res.status(204).send('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    }
  });

module.exports = router;
