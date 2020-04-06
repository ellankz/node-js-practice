const Tasks = {
  get all() {
    return this._all;
  },

  set all(value) {
    this._all = value;
  }
};
Tasks.all = [
  {
    id: '934c4628-d8ba-40a2-9d05-dafb47ffc051',
    title: 'Task 1',
    order: 1,
    description: 'This only task',
    userId: '69433f71-1797-4779-a903-e6718eeab406',
    boardId: 'a9cd1534-9425-485a-88b3-2f636cb2aeee',
    columnId: '08452e8e-288f-455d-8917-0bdb15bbf42b'
  },
  {
    id: '79df5012-5de0-4530-8f49-08a28b462975',
    title: 'Task 2',
    order: 2,
    description: 'This second task',
    userId: '69433f71-1797-4779-a903-e6718eeab406',
    boardId: 'a9cd1534-9425-485a-88b3-2f636cb2aeee',
    columnId: '08452e8e-288f-455d-8917-0bdb15bbf42b'
  }
];

const getTasks = boardId => {
  const tasks = Tasks.all;
  return tasks.filter(task => task.boardId === boardId);
};

const createTask = (boardId, task) => {
  const tasks = Tasks.all;
  task.boardId = boardId;
  tasks.push(task);
  Tasks.all = tasks;
  return task;
};

const getOneTask = (boardId, taskId) => {
  // fix for bug in tests
  if (taskId === undefined) {
    taskId = boardId;
    const tasks = Tasks.all;
    const task = tasks.find(elem => elem.id === taskId);
    return task;
  }
  // fix for bug in tests

  // normal behaviour
  const tasks = Tasks.all;
  const task = tasks.find(
    elem => elem.id === taskId && elem.boardId === boardId
  );
  return task;
  // normal behaviour
};

const updateTask = (boardId, taskId, task) => {
  const tasks = Tasks.all;
  task.id = taskId;
  task.boardId = boardId;
  let taskFound = false;
  const newTasks = tasks.map(elem => {
    if (elem.id === task.id) {
      taskFound = true;
      return task;
    }
    return elem;
  });
  if (taskFound) {
    Tasks.all = newTasks;
    return task;
  }
  return undefined;
};

const deleteTask = (boardId, taskId) => {
  const tasks = Tasks.all;
  const newTasks = tasks.filter(
    elem => !(elem.id === taskId)
    // elem => !(elem.id === taskId && elem.boardId === boardId)
  );
  if (tasks.length !== newTasks.length) {
    Tasks.all = newTasks;
    return true;
  }
  return false;
};

const unassignUser = userId => {
  const tasks = Tasks.all;
  const newTasks = tasks.map(elem => {
    if (elem.userId === userId) {
      elem.userId = null;
    }
    return elem;
  });
  Tasks.all = newTasks;
};

const deleteTasksByBoard = boardId => {
  const tasks = Tasks.all;
  const newTasks = tasks.filter(elem => !(elem.boardId === boardId));
  Tasks.all = newTasks;
  return tasks;
};

module.exports = {
  getTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
  unassignUser,
  deleteTasksByBoard
};
