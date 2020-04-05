const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const schemas = require('./task.schemas');
const { validateJoi, validateUuid } = require('../../validation/validate');

router
  .route('/:boardId/tasks')
  .all((req, res, next) => {
    next();
  }, validateUuid())
  .get((req, res) => {
    const tasks = tasksService.getTasks(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
  .post(validateJoi(schemas.post), (req, res) => {
    const newTask = tasksService.createTask(req.params.boardId, req.body);
    res.json(Task.toResponse(newTask));
  });

router
  .route('/:boardId/tasks/:taskId')
  .all((req, res, next) => {
    next();
  }, validateUuid())
  .get((req, res) => {
    const task = tasksService.getOneTask(req.params.boardId, req.params.taskId);
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).send('Task not found');
    }
  })
  .put(validateJoi(schemas.put), (req, res) => {
    const task = tasksService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).send('Task not found');
    }
  })
  .delete((req, res) => {
    const taskDeleted = tasksService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );
    if (taskDeleted) {
      res.status(204).send('The task has been deleted');
    } else {
      res.status(404).send('Task not found');
    }
  });

module.exports = router;
