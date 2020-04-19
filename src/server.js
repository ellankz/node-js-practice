const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/db.client');
const { logError } = require('./logging/winston.logger');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

process
  .on('unhandledRejection', reason => {
    reason.statusCode = 500;
    reason.message = `Unhandled Rejection at Promise: ${reason.message}`;
    logError(reason);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  })
  .on('uncaughtException', err => {
    err.statusCode = 500;
    err.message = `Uncaught Exception: ${err.message}`;
    logError(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
