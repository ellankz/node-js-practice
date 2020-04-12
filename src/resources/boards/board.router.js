const router = require('express').Router();
const boardsService = require('./board.service');
const schemas = require('./board.schemas');
const { validateJoi, validateUuid } = require('../../validation/validate');
const { ErrorHandler } = require('../../errors/error');

router
  .route('/')
  .get((req, res, next) => {
    try {
      const boards = boardsService.getBoards();
      if (boards.length > 0) {
        res.json(boards);
      } else {
        throw new ErrorHandler(404, 'No boards found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .post(validateJoi(schemas.post), (req, res, next) => {
    try {
      const newBoard = boardsService.createBoard(req.body);
      res.json(newBoard);
    } catch (error) {
      next(error);
      return;
    }
  });

router
  .route('/:id')
  .all(validateUuid())
  .get((req, res, next) => {
    try {
      const board = boardsService.getOneBoard(req.params.id);
      if (board) {
        res.json(board);
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .put(validateJoi(schemas.put), (req, res, next) => {
    try {
      const updatedBoard = { ...req.body, id: req.params.id };
      const board = boardsService.updateBoard(updatedBoard);
      if (board) {
        res.json(updatedBoard);
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .delete((req, res, next) => {
    try {
      const boardDeleted = boardsService.deleteBoard(req.params.id);
      if (boardDeleted) {
        res.status(204).send('The board has been deleted');
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  });

module.exports = router;
