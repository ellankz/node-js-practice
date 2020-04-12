const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { handleError } = require('./errors/error');
const { logRequest, logError } = require('./logging/winston.logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process
  .on('unhandledRejection', reason => {
    reason.statusCode = 500;
    reason.message = `Unhandled Rejection at Promise: ${reason.message}`;
    logError(reason);
  })
  .on('uncaughtException', err => {
    err.statusCode = 500;
    err.message = `Uncaught Exception: ${err.message}`;
    logError(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });

app.use(express.json());

app.use(logRequest);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((err, req, res, next) => {
  err.message = !err.message ? 'Internal server error' : err.message;
  err.statusCode = !err.statusCode ? 500 : err.statusCode;
  handleError(err, res);
  next(err);
});

module.exports = app;
