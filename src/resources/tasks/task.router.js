const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const schemas = require('./task.schemas');
const { validateJoi, validateUuid } = require('../../validation/validate');
const { ErrorHandler } = require('../../errors/error');

router
  .route('/:boardId/tasks')
  .all(validateUuid())
  .get((req, res, next) => {
    try {
      const tasks = tasksService.getTasks(req.params.boardId);
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
  .post(validateJoi(schemas.post), (req, res, next) => {
    try {
      const newTask = tasksService.createTask(req.params.boardId, req.body);
      res.json(Task.toResponse(newTask));
    } catch (error) {
      next(error);
      return;
    }
  });

router
  .route('/:boardId/tasks/:taskId')
  .all(validateUuid())
  .get((req, res, next) => {
    try {
      const task = tasksService.getOneTask(
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
  .put(validateJoi(schemas.put), (req, res, next) => {
    try {
      const task = tasksService.updateTask(
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
  .delete((req, res, next) => {
    try {
      const taskDeleted = tasksService.deleteTask(
        req.params.boardId,
        req.params.taskId
      );
      if (taskDeleted) {
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
