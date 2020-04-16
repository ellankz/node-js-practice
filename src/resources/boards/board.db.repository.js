const Board = require('./board.model');
const _ = require('lodash');

const getBoards = async () => {
  return Board.find({});
};

const createBoard = async board => {
  return Board.create(board);
};

const getOneBoard = async id => {
  return Board.findOne({ _id: id });
};

const updateBoard = async board => {
  return await Board.updateOne({ _id: board.id }, _.omit(board, ['id']));
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = {
  getBoards,
  createBoard,
  getOneBoard,
  updateBoard,
  deleteBoard
};
