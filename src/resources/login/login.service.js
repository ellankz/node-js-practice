const usersService = require('../users/user.service');
const { jwtCreate } = require('../../jwt/jwt');

const authenticate = async user => {
  const foundUser = await usersService.getOneUserByParams({
    login: user.login
  });
  const userMatch = await foundUser.comparePassword(user.password);
  if (!userMatch) {
    return { token: false };
  }
  return createJWT(foundUser);
};

const createJWT = user => {
  const payload = {
    userId: user.id,
    login: user.login
  };
  const token = jwtCreate(payload);
  console.log(token);
  return { token };
};

module.exports = {
  authenticate,
  createJWT
};
