const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getBoards = () => boardsRepo.getBoards();

const createBoard = board => boardsRepo.createBoard(board);

const getOneBoard = id => boardsRepo.getOneBoard(id);

const updateBoard = board => boardsRepo.updateBoard(board);

const deleteBoard = async id => {
  const result = await boardsRepo.deleteBoard(id);
  tasksService.deleteTasksByBoard(id);
  return result;
};

module.exports = {
  getBoards,
  createBoard,
  getOneBoard,
  updateBoard,
  deleteBoard
};
