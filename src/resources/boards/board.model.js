const uuid = require('uuid');
const mongoose = require('mongoose');
const _ = require('lodash');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [
      {
        id: { type: String, default: uuid },
        title: String,
        order: Number,
        _id: false
      }
    ]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  console.log('board in toresponse', board);

  const { _id, title } = board;
  const columns = board.columns.map(col => {
    col._id = col.id;
    return _.omit(col, ['id']);
  });
  const id = _id;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
