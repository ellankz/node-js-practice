const Users = {
  get all() {
    return this._all;
  },

  set all(value) {
    this._all = value;
  }
};
Users.all = [
  {
    id: '69433f71-1797-4779-a903-e6718eeab406',
    name: 'Ella',
    login: 'sdfgh77'
  },
  {
    id: 'd31841af-e692-4878-97f7-81b2e198bb04',
    name: 'TEST_USER',
    login: 'test_user'
  },
  {
    id: '8b7007c8-f83a-4344-9991-1856ee0ca751',
    name: 'TEST_USER',
    login: 'test_user'
  }
];

const getUsers = () => {
  return Users.all;
};

const createUser = user => {
  const users = Users.all;
  users.push(user);
  Users.all = users;
  return user;
};

const getOneUser = id => {
  const users = Users.all;
  return users.find(elem => elem.id === id);
};

const updateUser = user => {
  let users = Users.all;
  let updated = false;
  users = Users.all.map(elem => {
    if (elem.id === user.id) {
      updated = true;
      return user;
    }
    return elem;
  });
  if (updated) {
    Users.all = users;
    return user;
  }
  return false;
};

const deleteUser = id => {
  const users = Users.all;
  const newUsers = users.filter(elem => elem.id !== id);
  if (users.length !== newUsers.length) {
    Users.all = newUsers;
    return true;
  }
  return false;
};

module.exports = { getUsers, createUser, getOneUser, updateUser, deleteUser };
