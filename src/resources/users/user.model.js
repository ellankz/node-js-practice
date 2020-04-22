/* eslint-disable prettier/prettier */
const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// eslint-disable-next-line func-names
userSchema.pre('save', async function () {
  const user = this;
  await bcrypt.hash(user.password, saltRounds).then(hash => {
    user.password = hash;
  });
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = async function (receivedPassword) {
  return await bcrypt.compare(receivedPassword, this.password);
};

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
