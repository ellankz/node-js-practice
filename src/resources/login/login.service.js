const usersService = require('../users/user.service');
const { jwtCreate } = require('../../jwt/jwt');
const { ErrorHandler } = require('../../errors/error');

const authenticate = async user => {
  const foundUser = await usersService.getOneUserByParams({
    login: user.login
  });
  if (!foundUser) {
    throw new ErrorHandler(403, 'Incorrect login or password');
  }
  const userMatch = await foundUser.comparePassword(user.password);
  if (!userMatch) {
    throw new ErrorHandler(403, 'Incorrect login or password');
  }
  return await createJWT(foundUser);
};

const createJWT = async user => {
  const payload = {
    userId: user.id,
    login: user.login
  };
  const token = await jwtCreate(payload);
  return { token };
};

module.exports = {
  authenticate,
  createJWT
};
