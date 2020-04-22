const usersService = require('../users/user.service');
const jwt = require('jsonwebtoken');

const authenticate = async user => {
  const foundUser = await usersService.getOneUserByParams({
    login: user.login
  });
  const userMatch = await foundUser.comparePassword(user.password);
  if (!userMatch) {
    return { token: false };
  }
  return await createJWT(foundUser);
};

const createJWT = async user => {
  const payload = {
    userId: user.id,
    login: user.login
  };
  const options = {
    expiresIn: '7d'
  };
  const secret = Buffer.from(process.env.JWT_SECRET_KEY, 'base64');
  const token = await jwt.sign(payload, secret, options);
  return { token };
};

module.exports = {
  authenticate,
  createJWT
};
