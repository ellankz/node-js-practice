const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const users = [
  new User({ name: 'Ella', login: 'sdfgh77', password: 'pass' }),
  new User({ name: 'TEST_USER', login: 'test_user', password: 'pass' }),
  new User({ name: 'TEST_USER', login: 'test_user', password: 'pass' })
];

const boards = [
  new Board({
    id: 'a9cd1534-9425-485a-88b3-2f636cb2aeee',
    title: 'Autotest board',
    columns: [
      {
        title: 'Backlog',
        order: 1,
        id: '5a6f785f-0252-4112-9e60-71528c321f02'
      },
      { title: 'Sprint', order: 2, id: '563bfcd6-0166-4763-baec-42a16a6cb9d1' }
    ]
  }),
  new Board({
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
  })
];

const connectToDB = cb => {
  mongoose.connect(
    'mongodb+srv://nodeAppUser:wertwert@basiccluster-mi0sv.mongodb.net/rest?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("We're connected");
    await db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    cb();
  });
};

module.exports = { connectToDB };
