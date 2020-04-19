const Task = require('./task.model');

const getTasks = boardId => {
  return Task.find({ boardId });
};

const createTask = (boardId, task) => {
  task.boardId = boardId;
  return Task.create(task);
};

const getOneTask = (boardId, taskId) => {
  return Task.findOne({ boardId, _id: taskId });
};

const updateTask = (boardId, taskId, task) => {
  task._id = taskId;
  task.boardId = boardId;
  return Task.updateOne({ boardId, _id: taskId }, task);
};

const deleteTask = async (boardId, taskId) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).ok;
};

const unassignUser = userId => {
  return Task.updateMany({ userId }, { userId: null });
};

const deleteTasksByBoard = boardId => {
  return Task.deleteMany({ boardId });
};

module.exports = {
  getTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
  unassignUser,
  deleteTasksByBoard
};
