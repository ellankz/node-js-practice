const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getUsers = () => usersRepo.getUsers();

const createUser = user => usersRepo.createUser(user);

const getOneUser = id => usersRepo.getOneUser(id);

const updateUser = user => usersRepo.updateUser(user);

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);
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
