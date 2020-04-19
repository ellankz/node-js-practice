const router = require('express').Router();
const boardsService = require('./board.service');
const schemas = require('./board.schemas');
const { validateJoi, validateUuid } = require('../../validation/validate');
const { ErrorHandler } = require('../../errors/error');
const Board = require('./board.model');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getBoards();
      res.json(boards.map(Board.toResponse));
    } catch (error) {
      next(error);
      return;
    }
  })
  .post(validateJoi(schemas.post), async (req, res, next) => {
    try {
      const newBoard = await boardsService.createBoard(req.body);
      console.log(newBoard);
      res.json(Board.toResponse(newBoard));
    } catch (error) {
      next(error);
      return;
    }
  });

router
  .route('/:id')
  .all(validateUuid())
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.getOneBoard(req.params.id);
      if (board) {
        res.json(Board.toResponse(board));
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .put(validateJoi(schemas.put), async (req, res, next) => {
    try {
      const updatedBoard = { ...req.body, id: req.params.id };
      const board = await boardsService.updateBoard(updatedBoard);
      if (board) {
        res.json(Board.toResponse(updatedBoard));
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .delete(async (req, res, next) => {
    try {
      const boardDeleted = await boardsService.deleteBoard(req.params.id);
      if (boardDeleted === 1) {
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
