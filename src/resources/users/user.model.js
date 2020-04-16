const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { _id, name, login } = user;
  const id = _id;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
