const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(col => {
      if (!col.id) col.id = uuid();
      return col;
    });
  }
}

module.exports = Board;
