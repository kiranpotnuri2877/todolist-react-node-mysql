const {createPool} = require('mysql2/promise');

const pool = createPool({
  host: 'db',
  user: 'root',
  password: 'myname123',
  database: 'todolist',
  namedPlaceholders: true,
});

module.exports = {
  pool,
};
