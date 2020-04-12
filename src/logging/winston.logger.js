const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.timestamp(), format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'log/info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

const logRequest = (req, res, next) => {
  const { originalUrl, query, body } = req;
  logger.info(
    `URL: ${originalUrl}, PARAMS: ${JSON.stringify(
      query
    )}, BODY: ${JSON.stringify(body)}`
  );
  next();
};

const logError = err => {
  err.message = !err.message ? 'Internal server error' : err.message;
  err.statusCode = !err.statusCode ? 500 : err.statusCode;
  logger.error(`${err.statusCode}, ${err.message}`);
};

module.exports = { logRequest, logError };
