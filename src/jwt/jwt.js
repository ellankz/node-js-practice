const jwt = require('jsonwebtoken');
const util = require('util');
const { ErrorHandler } = require('../errors/error');
const secret = Buffer.from(process.env.JWT_SECRET_KEY, 'base64');

const jwtCreate = async payload => {
  const options = {
    expiresIn: '7d'
  };
  const sign = util.promisify(jwt.sign);
  const token = await sign(payload, secret, options);
  return token;
};

const checkJWT = async (req, res, next) => {
  try {
    if (
      req.originalUrl === '/login' ||
      req.originalUrl.startsWith('/doc') ||
      req.originalUrl === '/' ||
      req.originalUrl === '/favicon.ico'
    ) {
      next();
      return;
    } else if (
      req.header('Authorization') &&
      req.header('Authorization').startsWith('Bearer ')
    ) {
      const tokenReceived = req.header('Authorization').substring(7);
      const verify = util.promisify(jwt.verify);
      await verify(tokenReceived, secret);
      next();
      return;
    }
    throw new ErrorHandler(401, 'Access token is missing or invalid');
  } catch (err) {
    err.statusCode = 401;
    err.message = 'Access token is missing or invalid';
    next(err);
    return;
  }
};

module.exports = { jwtCreate, checkJWT };
