const router = require('express').Router();
const boardsService = require('./board.service');
const schemas = require('./board.schemas');
const { validateJoi, validateUuid } = require('../../validation/validate');

router
  .route('/')
  .get((req, res) => {
    const boards = boardsService.getBoards();
    res.json(boards);
  })
  .post(validateJoi(schemas.post), (req, res) => {
    const newBoard = boardsService.createBoard(req.body);
    res.json(newBoard);
  });

router
  .route('/:id')
  .all(validateUuid())
  .get((req, res) => {
    const board = boardsService.getOneBoard(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send('Board not found');
    }
  })
  .put(validateJoi(schemas.put), (req, res) => {
    const updatedBoard = { ...req.body, id: req.params.id };
    const board = boardsService.updateBoard(updatedBoard);
    if (board) {
      res.json(updatedBoard);
    } else {
      res.status(404).send('Board not found');
    }
  })
  .delete((req, res) => {
    const boardDeleted = boardsService.deleteBoard(req.params.id);
    if (boardDeleted) {
      res.status(204).send('The board has been deleted');
    } else {
      res.status(404).send('Board not found');
    }
  });

module.exports = router;
