const chalk = require('chalk');
const { db } = require('./server/db');
const app = require('./server');
const PORT = 1337;

db.sync({force: true}) 
  .then(() => {
    console.log('db synced');
    app.listen(PORT, () =>
      console.log(chalk.blue(`Listening at http://localhost:${PORT}`))
    );
  });