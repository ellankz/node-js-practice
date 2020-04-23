const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/error');
const secret = Buffer.from(process.env.JWT_SECRET_KEY, 'base64');

const jwtCreate = payload => {
  const options = {
    expiresIn: '7d'
  };
  const token = jwt.sign(payload, secret, options);
  console.log('created token', token);
  return token;
};

const checkJWT = (req, res, next) => {
  try {
    console.log('received header', req.header('Authorization'));
    if (req.originalUrl === '/login') {
      next();
      return;
    } else if (
      req.header('Authorization') &&
      req.header('Authorization').startsWith('Bearer ')
    ) {
      const tokenReceived = req.header('Authorization').substring(7);
      jwt.verify(tokenReceived, secret);
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
