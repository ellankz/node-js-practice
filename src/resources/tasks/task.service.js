const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getTasks = boardId => tasksRepo.getTasks(boardId);

const createTask = (boardId, task) => {
  const newTask = new Task(task);
  return tasksRepo.createTask(boardId, newTask);
};

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
