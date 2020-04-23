const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const { handleError } = require('./errors/error');
const { logRequest } = require('./logging/winston.logger');
const { checkJWT } = require('./jwt/jwt');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
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

app.use(checkJWT);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  err.message = !err.message ? 'Internal server error' : err.message;
  err.statusCode = !err.statusCode ? 500 : err.statusCode;
  handleError(err, res);
  next(err);
});

module.exports = app;
