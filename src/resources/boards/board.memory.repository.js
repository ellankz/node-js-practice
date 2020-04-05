const Boards = {
  get all() {
    return this._all;
  },

  set all(value) {
    this._all = value;
  }
};
Boards.all = [
  {
    id: 'a9cd1534-9425-485a-88b3-2f636cb2aeee',
    title: 'Autotest board',
    columns: [
      {
        title: 'Backlog',
        order: 1,
        id: '5a6f785f-0252-4112-9e60-71528c321f02'
      },
      {
        title: 'Sprint',
        order: 2,
        id: '563bfcd6-0166-4763-baec-42a16a6cb9d1'
      }
    ]
  },
  {
    id: '8adc5e54-33e9-436a-a9b5-ef17c7438ac4',
    title: 'Autotest board',
    columns: [
      {
        title: 'Backlog',
        order: 1,
        id: '82a230a4-66e7-4904-aa31-ae6f285f90c4'
      },
      {
        title: 'Sprint',
        order: 2,
        id: '195ae554-b55a-428b-9a9f-0a51367f6fd9'
      }
    ]
  }
];

const getBoards = () => {
  return Boards.all;
};

const createBoard = board => {
  const boards = Boards.all;
  boards.push(board);
  Boards.all = boards;
  return board;
};

const getOneBoard = id => {
  const boards = Boards.all;
  return boards.find(elem => elem.id === id);
};

const updateBoard = board => {
  let boards = Boards.all;
  let boardExists = false;
  boards = boards.map(elem => {
    if (elem.id === board.id) {
      boardExists = true;
      return board;
    }
    return elem;
  });
  if (boardExists) {
    Boards.all = boards;
    return board;
  }
  return false;
};

const deleteBoard = id => {
  const boards = Boards.all;
  const newBoards = boards.filter(elem => elem.id !== id);
  Boards.all = newBoards;
  return boards.length !== newBoards.length;
};

module.exports = {
  getBoards,
  createBoard,
  getOneBoard,
  updateBoard,
  deleteBoard
};
