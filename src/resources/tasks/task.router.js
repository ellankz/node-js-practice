const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const schemas = require('./task.schemas');
const { validateJoi, validateUuid } = require('../../validation/validate');
const { ErrorHandler } = require('../../errors/error');

router
  .route('/:boardId/tasks')
  .all(validateUuid())
  .get(async (req, res, next) => {
    try {
      const tasks = await tasksService.getTasks(req.params.boardId);
      if (tasks.length > 0) {
        res.json(tasks.map(Task.toResponse));
      } else {
        throw new ErrorHandler(404, 'No tasks found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .post(validateJoi(schemas.post), async (req, res, next) => {
    try {
      const newTask = await tasksService.createTask(
        req.params.boardId,
        req.body
      );
      res.json(Task.toResponse(newTask));
    } catch (error) {
      next(error);
      return;
    }
  });

router
  .route('/:boardId/tasks/:taskId')
  .all(validateUuid())
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.getOneTask(
        req.params.boardId,
        req.params.taskId
      );
      if (task) {
        res.json(Task.toResponse(task));
      } else {
        throw new ErrorHandler(404, 'Task not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .put(validateJoi(schemas.put), async (req, res, next) => {
    try {
      const task = await tasksService.updateTask(
        req.params.boardId,
        req.params.taskId,
        req.body
      );
      if (task) {
        res.json(Task.toResponse(task));
      } else {
        throw new ErrorHandler(404, 'Task not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  })
  .delete(async (req, res, next) => {
    try {
      const taskDeleted = await tasksService.deleteTask(
        req.params.boardId,
        req.params.taskId
      );
      if (taskDeleted === 1) {
        res.status(204).send('The task has been deleted');
      } else {
        throw new ErrorHandler(404, 'Task not found');
      }
    } catch (error) {
      next(error);
      return;
    }
  });

module.exports = router;
