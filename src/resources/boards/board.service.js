const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getBoards = () => boardsRepo.getBoards();

const createBoard = board => {
  const newBoard = new Board(board);

  return boardsRepo.createBoard(newBoard);
};

const getOneBoard = id => boardsRepo.getOneBoard(id);

const updateBoard = board => boardsRepo.updateBoard(board);

const deleteBoard = id => {
  const result = boardsRepo.deleteBoard(id);
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
