const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getUsers = () => usersRepo.getUsers();

const createUser = user => usersRepo.createUser(user);

const getOneUserById = id => usersRepo.getOneUserByParams({ _id: id });

const getOneUserByParams = async paramsObj => {
  return usersRepo.getOneUserByParams(paramsObj);
};

const updateUser = user => usersRepo.updateUser(user);

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);
  await tasksService.unassignUser(id);
  return result;
};

module.exports = {
  getUsers,
  updateUser,
  createUser,
  getOneUserById,
  deleteUser,
  getOneUserByParams
};
