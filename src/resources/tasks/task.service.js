const tasksRepo = require('./task.db.repository');

const getTasks = boardId => tasksRepo.getTasks(boardId);

const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);

const getOneTask = (boardId, taskId) => tasksRepo.getOneTask(boardId, taskId);

const updateTask = (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const deleteTasksByBoard = boardId => tasksRepo.deleteTasksByBoard(boardId);

const unassignUser = userId => tasksRepo.unassignUser(userId);

module.exports = {
  getTasks,
  updateTask,
  createTask,
  getOneTask,
  deleteTask,
  unassignUser,
  deleteTasksByBoard
};
