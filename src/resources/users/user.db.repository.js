const User = require('./user.model');
const _ = require('lodash');

const getUsers = async () => {
  return User.find({});
};

const createUser = async user => {
  return User.create(user);
};

const getOneUserByParams = paramsObj => {
  return User.findOne(paramsObj);
};

const updateUser = async user => {
  const userBody = _.omit(user, ['id']);
  return await User.updateOne({ _id: user.id }, userBody);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).ok;
};

module.exports = {
  getUsers,
  createUser,
  getOneUserByParams,
  updateUser,
  deleteUser
};
