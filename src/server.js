const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/db.client');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
