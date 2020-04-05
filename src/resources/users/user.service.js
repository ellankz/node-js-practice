const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');
const User = require('./user.model');

const getUsers = () => usersRepo.getUsers();

const createUser = user => {
  const newUser = new User(user);
  return usersRepo.createUser(newUser);
};

const getOneUser = id => usersRepo.getOneUser(id);

const updateUser = user => usersRepo.updateUser(user);

const deleteUser = id => {
  const result = usersRepo.deleteUser(id);
  tasksService.unassignUser(id);
  return result;
};

module.exports = {
  getUsers,
  updateUser,
  createUser,
  getOneUser,
  deleteUser
};
